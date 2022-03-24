export default (Client:any) => {

    return async(
        
        {

            tokenId,
            adminId

        }:any = {}
    
    ) => {
    
        const client = new Client(keys.databaseInfo);
    
        try {
        
            await client.connect();
    
            await client.query("delete * from admin_token where id = $1 and admin_id: $2 and blocked = false", [tokenId, adminId]);
    
            return true;
            
    
        } catch (e:any) {

            logger.error(e);
            
            return false;
            
    
        } finally{
    
            client.end();
    
        }
    
    }
}
