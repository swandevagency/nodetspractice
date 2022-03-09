module.exports = () => {

    // defining a db client

    const {Client} = require("pg")
        
    const client = new Client(keys.databaseInfo);

    global.dbClient = client;

    // defining a query for simple query functions

    global.query = require("./modules/postgresQueryFunction");

}