export default (Client:any) => {

    return async(
        
        {

            username,
            email,

        }:any = {}
    
    ) => {
    
        const client = new Client(keys.databaseInfo);
    
        try {
        
            await client.connect();
    
            const {rows: adminsFound} = await client.query("select * from admin where username = $1 and email = $2", [username, email]);
    
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
            
            throw new Error("No admin was found !");
            
    
        } finally{
    
            client.end();
    
        }
    
    }
}
