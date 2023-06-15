const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Joi } = require("express-validation");
const User = require("../Modals/userModal");
const _ = require("lodash");
require("dotenv").config();

//Generating JWT token
async function getUserToken(user) {
  try {
    const payload = {
      id: user.dataValues.id,
      email: user.dataValues.email,
    };
    return jwt.sign(payload, process.env.USER_SECRET_KEY, {
      expiresIn: 9000,
    });
  } catch (error) {
    return error.message;
  }
}
//User Login MiddleWare

// const loginUser = async (req, res, next) => {
//   debugger
//   try {
//     const validateSchema = Joi.object().keys({
//       email: Joi.string().required(),
//       password: Joi.string().required(),
//     });

//     const validate = validateSchema.validate(req.body);
//     if (validate.error) {
//       return res.status(412).json({
//         status: 412,
//         message: validate.error.details[0].message,
//         data: {
//           token: null,
//         },
//       });
//     }
//     const user = await User.findOne({ where: { email: req.body.email } });
//     if (!user) {
//       return res.status(404).json({
//         status: 404,
//         message: "User not found",
//         data: {
//           token: null,
//         },
//       });
//     }

//     const isPasswordValid = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!isPasswordValid) {
//       return res.status(412).json({
//         status: 412,
//         message: "Invalid password",
//         data: {
//           token: null,
//         },
//       });
//     }

//     const token = await getUserToken(user);
//     user.token = token;
//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(412).json({
//       status: 412,
//       message: error.message,
//       data: {
//         token: null,
//       },
//     });
//   }
// };
//Authenticate Middleware
const verifyUserToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Access denied.No token provided",
      });
    }
    const decoded = await jwt.verify(token, process.env.USER_SECRET_KEY);
    //console.log(decoded)
    const user = await User.findOne({ where: { email : decoded.email } });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User does not exist!",
      });
    }
    _.omit(user.dataValues, ["password", "oldPasswords"]);
    req.user = user;
    next();
  } catch (error) {
    return res.status(412).json({
      status: 412,
      message: error.message,
    });
  }
};
module.exports = {
//   loginUser,
  getUserToken,
  verifyUserToken, 
};
