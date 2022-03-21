export default (Client:any) => {

    return async(
        
        {

            id

        }:any = {}
    
    ) => {
    
        const client = new Client(keys.databaseInfo);
    
        try {
        
            await client.connect();
    
            const {rows: adminsFound} = await client.query("select * from admin where id = $1", [id]);
    
            return Object.freeze({
                id: adminsFound[0].id,
                first_name: adminsFound[0].first_name,
                last_name: adminsFound[0].last_name,
                email: adminsFound[0].email,
                hashedData: adminsFound[0].hashed_data,
                username: adminsFound[0].username,
                blocked: adminsFound[0].blocked
            })
            
    
        } catch (e:any) {

            logger.error(e);
            
            throw new Error("Invalid credentials !");
            
    
        } finally{
    
            client.end();
    
        }
    
    }
}
