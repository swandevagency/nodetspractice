// loading the deps
const server = require("express");


module.exports = async() => {

    // defining the application
    const app = server();

    // setting the keys
    require("./setKeys")();

    // set database functions
    require("./setDatabase")();

    // setting routes

    require("./setRoutes")(server, app);

    // initiating the application
    try {

        const {port} = keys.serverInfo;

        await app.listen(port);

        console.log(`listening to port ${port}`);

    } catch (error) {

        console.log(error);

    }
    
}