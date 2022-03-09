// requiring the server middlewares

const morgan = require("morgan");
const cors = require("cors");

// requiring the postgress client for nodejs



module.exports = async(server: any) => {

    // setting the keys
    require("../config/setKeys")();

    // setting the controllers 
    require("./controllers/setControllers")();

    global.query = require("./database/query");

    // defining the server application
    const app = server();

    // requiring the server middlewares

    app.use(server.json());
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

    // setting the cors policies
    const corsOpts = {
        origin: '*',

        methods: '*',

        allowedHeaders: [
            'Content-Type',
            'authorization',
            'index'
        ],
    };

    app.use(cors(corsOpts));

    global.router = server.Router();

    // loading the routes
    
    require("./routes/index")(app, keys.serverInfo.baseURL);

    // listening to the port we supposed to
    app.listen(keys.serverInfo.port, () => {
        console.log(`listening to the port ${keys.serverInfo.port}`);
    })
}