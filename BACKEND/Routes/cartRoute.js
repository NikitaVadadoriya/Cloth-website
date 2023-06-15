const cartController = require('../Controller/cartController');
const {verifyUserToken} =require('../Middleware/authenicate')
const cartRouter = require("express").Router();

cartRouter.post('/addtocart', cartController.addToCart)
cartRouter.post('/addcart', cartController.addCart)
cartRouter.get('/getallcount',cartController.getAllcartProduct)
cartRouter.get('/all/:id',cartController.getAllcartdataById)
cartRouter.put('/:id/increment', cartController.Increment);
cartRouter.put('/:id/decrement', cartController.Decrement);
cartRouter.put('/update', verifyUserToken,cartController.updatecartdata);
cartRouter.delete('/delete/:id', cartController.deletedUser);
cartRouter.delete('/:id', cartController.deletecartData);

module.exports = cartRouter
