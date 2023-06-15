const User =require('../Modals/userModal');
const {Joi} =require('express-validation');
const {getUserToken}=require('../Middleware/authenicate')
const bcrypt = require('bcrypt');
const { where } = require('sequelize');

// USER REGISTRATION 🤞🤞

const userRegister =async(req,res)=>{
 try {
    const validationSchema = Joi.object().keys({
        username:Joi.string().required(),
        email:Joi.string().required().email(),
        password:Joi.string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
            .required()
            .messages({
              "string.pattern.base":
                "Password must contain 8 characters,one uppercase,one lowercase,one number and one special character",
            }),
         roleType:Joi.required(), 
         image:Joi.required()
    })
    req.body.image=req.file
    const validate = validationSchema.validate(req.body);
    if (validate.error) {
      return res.status(412).json({
        status: 412,
        message: validate.error.details[0].message
      })
    }
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(412).json({
        status: 412,
        message: 'Email Id Allready In Use..'
      });
    }
    bcrypt.hash(req.body.password, 10, async (error, hash) => {
        if (error) {
          return res.status(412).json({
            status: 412,
            message: "Error while hashing password"
          })
        }
        req.body.password = hash; 
        const user = await User.create({
            email: req.body.email,
            username: req.body.username,
            image: req.file.path,
            roleType: req.body.roleType,
            password:req.body.password
          });
          const token = await getUserToken(user)
          user.token = token
          console.log(user.token);
          return res.status(200).json({
            status: 200,
            message: "User registered successfully",
            user: user,
            token:token
          });
        });
 } catch (error) {
    return res.status(412).json({
        status: 412,
        message: error.message,
      });
 }
}


// USER LOGIN CONTROLLER 🤞🤞

const userLogin = async(req,res,next)=>{
    try {
        const validateSchema = Joi.object().keys({
          email: Joi.string().required().email(),
          password: Joi.string().required(),
        });
        const validate = validateSchema.validate(req.body);
        if (validate.error) {
          return res.status(412).json({
            status: 412,
            message: validate.error.details[0].message,
          });
        }
        const user = await User.findOne({ where: { email: req.body.email } });
        const token = await getUserToken(user)
        user.token = token
        const isPasswordValid = await bcrypt.compare(
          req.body.password,
          user.password,
        );
        if (!isPasswordValid) {
          return res.status(412).json({
            status: 412,
            message: "Invalid password",
          });
        }
        if (user) {
          return res.status(200).json({
            status: 200,
            message: "Login Successful",
            data: {
              user,
              token
            }
          })
        }
       next()
      } catch (error) {
        return res.status(412).json({
          status: 412,
          message: "not Login..",
        });
      }
}

const getAllUser =async(req,res)=>{
   const roleType = "0"
  const user=await User.findAll({
    where:{roleType:roleType}
  })
  if(user){
    res.status(200).json({
      data:user
    })
  }
}

module.exports={
    userRegister,
    userLogin,
    getAllUser
}



 

