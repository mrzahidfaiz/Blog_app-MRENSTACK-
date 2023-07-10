const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const UserDTO = require("../dto/user");
const JWTService = require("../services/JWTService");
const RefreshSchema = require("../models/token");

const passwordPattren = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const passwordMessage = "One UpperCase One LowerCase and One Number Required!";

const authController = {
  async register(req, res, next) {
    const RegisterUserSchema = Joi.object({
      name: Joi.string().max(30).required(),
      username: Joi.string().min(6).max(25).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(passwordPattren)
        .messages({
          "string.min": "Must have at least 8 characters",
          "object.regex": "Must have at least 8 characters",
          "string.pattern.base":
            "One UpperCase One LowerCase and One Number Required!",
        })
        .required(),
      confirmpassword: Joi.ref("password"),
    });

    const { error } = RegisterUserSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { name, username, email, password } = req.body;

    try {
      const usernameInUse = await User.exists({ username: username });
      if (usernameInUse) {
        const error = {
          status: 409,
          message: "Username is Already Exists, try another",
        };
        return next(error);
      }
      const emailInUse = await User.exists({ email: email });
      if (emailInUse) {
        const error = {
          status: 409,
          message: "Email is Already Exists, try another",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    let accessToken;
    let refreshToken;
    let user;
    try {
      const newUser = new User({
        name: name,
        email: email,
        username: username,
        password: hashPassword,
      });

      user = await newUser.save();

      accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
      refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");
    } catch (error) {
      return next(error);
    }

    await JWTService.storeRefreshToken(refreshToken, user._id);

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure,
      sameSite: secure ? "None" : "Lax",
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure,
      sameSite: secure ? "None" : "Lax",
    });

    const UserDto = new UserDTO(user);

    return res.status(201).json({
      user: UserDto,
      message: "User Register Successfully",
      auth: true,
    });
  },

  async login(req, res, next) {
    const userLoginSchema = Joi.object({
      username: Joi.string().min(6).max(25).required(),
      password: Joi.string()
        .pattern(passwordPattren)
        .messages({
          "string.min": "Must have at least 8 characters",
          "object.regex": "Must have at least 8 characters",
          "string.pattern.base":
            "One UpperCase One LowerCase and One Number Required!",
        })
        .required(),
    });

    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { username, password } = req.body;

    let user;
    try {
      user = await User.findOne({ username: username });
      if (!user) {
        const error = {
          status: 401,
          message: "Invalid Username",
        };
        return next(error);
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        const error = {
          status: 401,
          message: "invalid Password",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    let accessToken;
    let refreshToken;
    try {
      accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
      refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");

      await RefreshSchema.updateOne(
        {
          _id: user._id,
        },
        {
          token: refreshToken,
        },
        {
          upsert: true,
        }
      );
    } catch (error) {
      return next(error);
    }

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure,
      sameSite: secure ? "None" : "Lax",
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure,
      sameSite: secure ? "None" : "Lax",
    });

    const UserDto = new UserDTO(user);

    return res
      .status(200)
      .json({ user: UserDto, auth: true, message: "User Successfully Login" });
  },

  async logout(req, res, next) {
    // console.log(req);
    const { refreshToken } = req.cookies;

    try {
      await RefreshSchema.deleteOne({ token: refreshToken });
    } catch (error) {
      return next(error);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ user: null, auth: false });
  },

  async refresh(req, res, next) {
    const originalRefreshToken = req.cookies.refreshToken;

    let id;
    try {
      id = JWTService.verifyRefreshToken(originalRefreshToken)._id;
    } catch (e) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };
      return next(error);
    }

    try {
      const match = await RefreshSchema.findOne({
        _id: id,
        token: originalRefreshToken,
      });
      if (!match) {
        const error = {
          status: 401,
          message: "Unauthorized",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    try {
      const accessToken = JWTService.signAccessToken({ _id: id }, "30m");
      const refreshToken = JWTService.signRefreshToken({ _id: id }, "60m");

      await RefreshSchema.updateOne({ _id: id }, { token: refreshToken });

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure,
        sameSite: secure ? "None" : "Lax",
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure,
        sameSite: secure ? "None" : "Lax",
      });
    } catch (error) {
      return next(error);
    }

    let user;
    try {
      user = await User.findOne({ _id: id });
    } catch (error) {
      return next(error);
    }

    const UserDto = new UserDTO(user);

    res.status(200).json({ user: UserDto, auth: true });
  },
};

module.exports = authController;
