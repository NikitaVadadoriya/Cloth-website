const userController = require('../Controller/userController');
const upload = require('../Middleware/Imgeupload');
const { getUserToken,verifyUserToken } = require('../Middleware/authenicate');
const userRouter = require("express").Router();

userRouter.post('/login',userController.userLogin)
userRouter.post('/register',upload.single("image"),userController.userRegister);
userRouter.get('/profile', verifyUserToken, (req, res) =>{
    return res.status(200).json({
        status: 200,
        message: "User found!",
        data: {
          user: req.user,
        },
      });
});
userRouter.get("/getuser",userController.getAllUser)
module.exports = userRouter
