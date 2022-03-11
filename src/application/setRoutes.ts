// requiring
import morgan from "./modules/morganLogic"
const cors = require("cors");
const hpp = require('hpp');
const tooBusy = require("./modules/tooBusy");
const callBack = require("./modules/expressCallBack");
const routes = require("../../config/routes");
const controllers = require("../../config/controllers");
const {corsPolicies, serverInfo} = keys;


module.exports = async(server: any, app: any) => {

    // setting the server middlewares

    // making sure server can handle requests
    app.use(tooBusy);

    // preventing extreamly large requests
    app.use(server.urlencoded({ extended: true, limit: "1kb" }));
    app.use(server.json({ limit: "1kb" }));

    app.use(morgan);

    // preventing HTTP Parameter Pollution
    app.use(hpp());

    //  catching uncaught exceptions
    process.on('uncaughtException', (err, origin) => {
        logger.error(`Caught exception: ${err} Exception origin: ${origin}`)
    });

    // setting the cors policies
    app.use(cors(corsPolicies));

    try {

        // setting controllers
        const importedControllers = await require("./modules/getFunctions")(controllers, "../../controllers");

        // setting the routes
        routes.forEach(async(route:any) => {
            
            const router = server.Router();
            const routesBaseURL = "../routes";

            app.use(
                `${serverInfo.baseURL}/${route.name}`, 
                require(`${routesBaseURL}${route.url}`)(router, importedControllers, callBack)
            );

        });

    } catch (error) {
        logger.error(error);
    }
    
}
