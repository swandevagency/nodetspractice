// reqruing the Router

const router = require("express").Router();


//loading the required controllers

const {

    test: {

        getTestController

    }

} = require("../../controllers/index");

//routes

router.get('/', getTestController);


module.exports = router;