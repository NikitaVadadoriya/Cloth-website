const variantController = require('../Controller/variantController');

const variantRouter = require("express").Router();

variantRouter.post('/addvariant',variantController.addVariant)
variantRouter.get('/products',variantController.getProductsByColor);
variantRouter.get('/product/size/:size',variantController.getProductsBySize);
variantRouter.get('/getallvariant',variantController.getAllVariant);
variantRouter.get('/getallvariant/:id',variantController.getAllVariantById);
variantRouter.get('/getvariant',variantController.getAllVariantData)
variantRouter.get('/categories',variantController.allFilter)
variantRouter.get('/price',variantController.priceFilter)

module.exports = variantRouter
