export default (Client:any) => {

    return async(
        
        {
            tokenId,
            adminId,
            platform,

        }:any = {}
    
    ) => {
    
        const client = new Client(keys.databaseInfo);
    
        try {
        
            await client.connect();
    
            await client.query("begin");
    
            await client.query("insert into admin_token (id, admin_id, platform, blocked) values ($1, $2, $3, $4)",
            [tokenId, adminId, platform, false]);
    
            const {rows: tokenFound} = await client.query("select * from admin_token where id = $1;", [tokenId]);
    
            await client.query("commit");
            
            return Object.freeze({
                tokenId: tokenFound[0].id,
            })
            
    
        } catch (e:any) {
            
            logger.error(e);
            
            if (e.code == 23505) {
                
                throw new Error("Username or email already in use !");
    
            }else{
    
                throw new Error("An unexpected error occured !");
    
            }
            
    
        } finally{
    
            client.end();
    
        }
    
    }
}
