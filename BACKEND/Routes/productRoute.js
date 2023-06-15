const productController = require('../Controller/productController');

const productRouter = require("express").Router();

productRouter.post('/addproduct',productController.addProduct)
productRouter.get('/allproduct',productController.getAllProduct)
productRouter.get('/singleproduct/:id',productController.getProductById)
productRouter.get('/productcategory',productController.getProductCategoryandSubcategory)
productRouter.get('/women',productController.getProductByWomen)
productRouter.get('/men',productController.getProductByMen)
productRouter.get('/child',productController.getProductByChild)
productRouter.delete('/:id',productController.deleteProduct)
productRouter.put('/updateproduct/:id',productController.updateProduct)
productRouter.get('/get/:id',productController.getVariantById)


module.exports = productRouter
