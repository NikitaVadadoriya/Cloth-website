const categoryController = require('../Controller/categoryController');
const upload = require('../Middleware/Imgeupload');
const categoryRouter = require("express").Router();

categoryRouter.post('/addcategory',upload.single("image"),categoryController.addCategory);
categoryRouter.get('/getallcategory',categoryController.getAllCategory);

module.exports = categoryRouter
