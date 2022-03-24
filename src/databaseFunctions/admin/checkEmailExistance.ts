export default (Client:any) => {

    return async(
        
        {
            email,

        }:any = {}
    
    ) => {
    
        const client = new Client(keys.databaseInfo);
    
        try {
        
            await client.connect();
    
            const {rows: adminsFound} = await client.query("select * from admin where email = $1", [email]);
            

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
