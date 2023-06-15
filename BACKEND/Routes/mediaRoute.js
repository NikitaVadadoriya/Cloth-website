const mediaController = require('../Controller/mediaController');
const upload = require('../Middleware/Imgeupload');
const mediaRouter = require("express").Router();

mediaRouter.post('/addimages',upload.array("images",4),mediaController.addImages);
mediaRouter.get('/getimages/:id',mediaController.getAllImage);
module.exports = mediaRouter
