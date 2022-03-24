export default (Client:any) => {

    return async(
        
        {
            username,

        }:any = {}
    
    ) => {
    
        const client = new Client(keys.databaseInfo);
    
        try {
        
            await client.connect();
    
            const {rows: adminsFound} = await client.query("select * from admin where username = $1", [username]);
            

            if (adminsFound.length) {
                return true;   
            }else{
                return false;
            }
            
    
        } catch (e:any) {

            logger.error(e);
            
            throw new Error("An unexpected error occured !");
            
    
        } finally{
    
            client.end();
    
        }
    
    }
}
