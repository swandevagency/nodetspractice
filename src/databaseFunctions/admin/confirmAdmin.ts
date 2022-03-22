export default (Client:any) => {

    return async(
        
        {
            id,

        }:any = {}
    
    ) => {
    
        const client = new Client(keys.databaseInfo);
    
        try {
        
            await client.connect();
    
            await client.query("UPDATE admin SET confirmed = true WHERE id = $1", [id]);
            
            
    
        } catch (e:any) {
            
            throw new Error("An unexpected error occured !");
            
    
        } finally{
    
            client.end();
    
        }
    
    }
}
