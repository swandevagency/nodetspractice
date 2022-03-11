// loading the deps
const server = require("express");
import setLogger from "./setLogger"


module.exports = async() => {

    // defining the application
    const app = server();

    // setting the keys
    require("./setKeys")();

    setLogger();

    // set database functions
    require("./setDatabase")();

    // setting routes
    require("./setRoutes")(server, app);

    // initiating the application
    try {

        const {port} = keys.serverInfo;

        await app.listen(port);

        logger.debug(`listening to port ${port}`);

    } catch (error) {

        logger.error(error);

    }
    
}