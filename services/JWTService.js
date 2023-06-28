const jwt = require("jsonwebtoken");
const RefreshSchema = require("../models/token");
const {
  SECRET_ACCESS_TOKEN,
  SECRET_REFRESH_TOKEN,
} = require("../config/index");

class JWTService {
  signAccessToken(payload, expriyTime) {
    return jwt.sign(payload, SECRET_ACCESS_TOKEN, { expiresIn: expriyTime });
  }
  signRefreshToken(payload, expriyTime) {
    return jwt.sign(payload, SECRET_REFRESH_TOKEN, { expiresIn: expriyTime });
  }
  verifyAccessToken(token) {
    return jwt.verify(token, SECRET_ACCESS_TOKEN);
  }
  verifyRefreshToken(token) {
    return jwt.verify(token, SECRET_Refresh_TOKEN);
  }
  async storeRefreshToken(token, userId) {
    try {
      const newToken = new RefreshSchema({
        token: token,
        userId: userId,
      });

      await newToken.save();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = JWTService;
