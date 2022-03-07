// reqruing the Router

const router = require("express").Router();

const getTestController = require("../../controllers/test/getTestController");

//routes

router.get('/', getTestController);


module.exports = router;