// loading the deps
import server from "express";

import setLogger from "./setLogger";
import setKeys from "./setKeys";
import setDatabase from "./setDatabase";
import setRoutes from "./setRoutes";


export default  async() => {

    // defining the application
    const app = server();

    // setting the keys
    setKeys();

    setLogger();

    // set database functions
    setDatabase();

    // setting routes
    setRoutes(server, app);

    // initiating the application
    try {

        const {port} = keys.serverInfo;

        await app.listen(port);

        logger.debug(`listening to port ${port}`);

    } catch (error) {

        logger.error(error);

    }
    
}