const subcategoryController = require('../Controller/subcategoryController');
const upload = require('../Middleware/Imgeupload');
const subcategoryRouter = require("express").Router();

subcategoryRouter.post('/addsubcategory',upload.single("image"),subcategoryController.addSubcategory);
subcategoryRouter.get('/getallsubcategory',subcategoryController.getAllSubcategory);
subcategoryRouter.get('/getall',subcategoryController.getAll);
subcategoryRouter.get('/get/:id',subcategoryController.getSubcategoryById)
subcategoryRouter.get('/product/subcat/:subcategory_name',subcategoryController.getProductBySubcategory);


module.exports = subcategoryRouter
