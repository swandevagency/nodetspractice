export default (dbCommand: string) => {

    return new Promise(async(resolve, reject) => {
        
    
        // connecting to the posgresql client
    
        try {
    
            await dbClient.connect();
            logger.debug("connected to the databse");
            const result = await dbClient.query(dbCommand);
            resolve(result);
    
        } catch (e) {
            
            reject(e);
    
        } finally{
    
            dbClient.end();
    
        }
    });
}