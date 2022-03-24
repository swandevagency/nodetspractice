export default async(request: any, useCases: any, frameworks:any) => {

    const {

        email,

    } = request.body;

    const {

        admin: {
            checkEmailExistance
        }

    } = useCases;

    

    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        
        const emailExists = await checkEmailExistance(
            {
                email,
    
            },
            frameworks
        ); 

        if (emailExists) {
            
            return {
                headers,
                statusCode: 400,
                body: {
                    message: "Email taken !"
                }
            }

        }else {

            return {
                headers,
                statusCode: 200,
                body: {
                    message: "You are free to use this email !"
                }
            }
        }


    } catch (error:any) {
        logger.error(error);
        return{
            headers,
            statusCode: 400,
            body: {
                error: error.message
            }
    
        }
    }
    
}