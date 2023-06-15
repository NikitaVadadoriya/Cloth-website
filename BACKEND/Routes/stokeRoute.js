const stokeController = require('../Controller/stokeController');

const stokeRouter =  require("express").Router();

stokeRouter.post('/addstoke',stokeController.addStoke)

module.exports = stokeRouter
