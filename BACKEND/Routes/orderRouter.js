const orderController =require('../Controller/orderController');
const orderRoute =require('express').Router()

orderRoute.post('/addorder',orderController.addOrder);
orderRoute.get('/order/:id',orderController.getAllOrder)
orderRoute.get('/allorder',orderController.allOrder)
module.exports=orderRoute