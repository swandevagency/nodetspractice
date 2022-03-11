import postgresQueryFunction from "./modules/postgresQueryFunction";
import {Client} from "pg"

export default  () => {
    
    
    // defining a db client
        
    const client = new Client(keys.databaseInfo);

    global.dbClient = client;

    // defining a query for simple query functions

    global.query = postgresQueryFunction

}