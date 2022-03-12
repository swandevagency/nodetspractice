// loading the deps
import server from "express";

import setLogger from "./setLogger";
import setKeys from "./setKeys";
import setDatabase from "./setDatabase";
import setRoutes from "./setRoutes";


export default  async() => {

    try {
        // defining the application
        const app = server();
    
        // setting the keys
        await setKeys();
    
        await setLogger();
    
        // set database functions
        await setDatabase();
    
        // setting routes
        await setRoutes(server, app);
    
        // initiating the application

        const {port} = keys.serverInfo;

        await app.listen(port);

        logger.debug(`listening to port ${port}`);

    } catch (error) {

        logger.error(error);

    }
    
}