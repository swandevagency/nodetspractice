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
                first_name: adminsFound[0].first_name,
                last_name: adminsFound[0].last_name,
                email: adminsFound[0].email,
                hashedData: adminsFound[0].hashed_data,
                username: adminsFound[0].username
            })
            
    
        } catch (e) {

            logger.error(e);
            
            throw new Error("Invalid credentials !");
            
    
        } finally{
    
            client.end();
    
        }
    
    }
}
