const addressController =require('../Controller/addressController');
const addressRouter=require('express').Router();

addressRouter.post('/addaddress',addressController.addAddress);


module.exports=addressRouter