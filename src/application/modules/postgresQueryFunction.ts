const queryFunction = (dbCommand: string) => {

    return new Promise(async(resolve, reject) => {
        
    
        // connecting to the posgresql client
    
        try {
    
            await dbClient.connect();
            console.log("connected to the databse");
            const result = await dbClient.query(dbCommand);
            resolve(result);
    
        } catch (e) {
            
            reject(e);
    
        } finally{
    
            dbClient.end();
    
        }
    });
}