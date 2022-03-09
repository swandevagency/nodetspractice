// importing the controllers

const {

    test: {

        getTestController

    }

} = controllers;


// setting routes

router.get('/', getTestController);

// exporting routes

module.exports = router;