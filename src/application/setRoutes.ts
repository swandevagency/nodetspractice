// requiring
import morgan from "./modules/morganLogic"
import cors from "cors";
import hpp from "hpp";
import tooBusy from "./modules/tooBusy";
import callBack from "./modules/expressCallBack";
import routes from "../../config/routes";
import controllers from "../../config/controllers";
import frameworks from "../../config/frameworks";
import getFunctions from "./modules/getFunctions";


export default async(server: any, app: any) => {
    const {corsPolicies, serverInfo} = keys;

    //  catching uncaught exceptions
    process.on('uncaughtException', (err, origin) => {
        logger.error(`Caught exception: ${err} Exception origin: ${origin}`)
    });

    // setting the server middlewares

    // making sure server can handle requests
    app.use(tooBusy);

    // preventing extreamly large requests
    app.use(server.urlencoded({ extended: true, limit: "1kb" }));
    app.use(server.json({ limit: "1kb" }));

    app.use(morgan);

    // preventing HTTP Parameter Pollution
    app.use(hpp());

    // setting the cors policies
    app.use(cors(corsPolicies));

    try {

        // setting controllers
        const importedControllers = await getFunctions(controllers, "../../controllers");

        const importedFrameworks = await getFunctions(frameworks, "../../frameworks")

        // setting the routes
        routes.forEach(async(route:any) => {
            
            const router = server.Router();
            const routesBaseURL = "../routes";
            
            
            app.use(
                `${serverInfo.baseURL}/${route.name}`, 
                require(`${routesBaseURL}${route.url}`)(router, importedControllers, callBack, importedFrameworks)
            );

        });

    } catch (error) {
        logger.error(error);
    }
    
}
