module.exports = (dbCommand: string) => {
    return new Promise(async(resolve, reject) => {
        //defining a posgress client instance
        const {Client} = require("pg")
        
        const client = new Client(keys.databaseInfo);
    
        // connecting to the posgresql client
    
        try {
    
            await client.connect();
            console.log("connected to the databse");
            const result = await client.query(dbCommand);
            resolve(result);
    
        } catch (e) {
            
            reject(e);
    
        } finally{
    
            client.end();
    
        }
    }) 
}