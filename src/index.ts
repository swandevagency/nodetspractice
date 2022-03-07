// requiring the server middlewares

const morgan = require("morgan");
const cors = require("cors");

// defining the Key interface
interface Keys {

    serverInfo: {
        port: number,
        baseURL: string
    }
    
}

module.exports = (server: any, keys: Keys) => {
    

    //exporting the required keys
    const {
        serverInfo: {
            port,
            baseURL
        }
    } = keys;


    // defining the application
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

    // loading the routes
    
    require("./routes/index")(app, baseURL);

    // listening to the port we supposed to
    app.listen(port, () => {
        console.log(`listening to the port ${port}`);
    })
}