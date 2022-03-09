// requiring
const morgan = require("morgan");
const cors = require("cors");
const callBack = require("./modules/expressCallBack");
const routes = require("../../config/routes");
const controllers = require("../../config/controllers");
const {corsPolicies, serverInfo} = keys;


module.exports = async(server: any, app: any) => {

    // setting the server middlewares
    app.use(server.json());
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

    // setting the cors policies
    app.use(cors(corsPolicies));

    try {

        // setting controllers
        const importedControllers = await require("./modules/getControllers")(controllers);

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
        console.log(error);
    }
    
}
