export default async(request: any, useCases: any, frameworks: any) => {

    // setting response headers

    const headers = {
        'Content-Type': 'application/json'
    }

    // importing the functions from frameworks
    

    const {
        generatePassword
    } = frameworks;

    // importing usecases
    
    const {
        
        admin:{
            createAdmin,
            emailToAdmin
        }
        
    } = useCases

    // importing fields from requests body
    
    const {

        username, 
        first_name, 
        last_name, 
        email

    } = request.body;

    
    try {

        // creating admin
        

        const createdAdmin = await createAdmin(
            {username, 
            first_name, 
            last_name, 
            email},
            generatePassword
        );

        // returning the request

        
        return{
            headers,
            statusCode: 200,
            body: createdAdmin
        }

    } catch (error:any) {

        logger.error(error.message);

        return{
            headers,
            statusCode: 400,
            body: {
                error: error.message
            }
    
        }

    }
    
    
    
}