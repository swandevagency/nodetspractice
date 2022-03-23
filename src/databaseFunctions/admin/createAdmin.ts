export default (Client:any) => {

    return async(
        
        {
            id,
            username,
            first_name,
            last_name,
            email,
            hashedData
        }:any = {}
    
    ) => {
    
        const client = new Client(keys.databaseInfo);
    
        try {
        
            await client.connect();
    
            await client.query("begin");
    
            await client.query("insert into admin (id, username, first_name, last_name, email, hashed_data, blocked, confirmed) values ($1, $2, $3, $4, $5, $6, $7, $8)",
            [id,username, first_name, last_name, email, hashedData, false, false]);
    
            const {rows: adminsFound} = await client.query("select email, first_name, last_name from admin where id = $1;", [id]);
    
            await client.query("commit");
            
            return Object.freeze({
                id: adminsFound[0].id,
                first_name: adminsFound[0].first_name,
                last_name: adminsFound[0].last_name,
                email: adminsFound[0].email,
                hashedData: adminsFound[0].hashed_data,
                username: adminsFound[0].username,
                blocked: adminsFound[0].blocked,
                confirmed: adminsFound[0].confirmed,
                createdAt: adminsFound[0].created_at
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
