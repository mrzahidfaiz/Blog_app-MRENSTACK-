const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const UserDTO = require("../dto/user");

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
        .message(passwordMessage)
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

    let user;
    try {
      const newUser = new User({
        name: name,
        email: email,
        username: username,
        password: hashPassword,
      });

      user = await newUser.save();
    } catch (error) {
      return next(error);
    }

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
      password: Joi.string().pattern(passwordPattren).required(),
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

    const UserDto = new UserDTO(user);

    return res
      .status(200)
      .json({ user: UserDto, auth: true, message: "User Successfully Login" });
  },
};

module.exports = authController;
