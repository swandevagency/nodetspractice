export default async(request: any, useCases: any, frameworks:any) => {

    const {

        username,

    } = request.body;

    const {

        admin: {
            checkUsernameExistance
        }

    } = useCases;

    

    const headers = {
        'Content-Type': 'application/json'
    };

    try {

        const usernameExists = await checkUsernameExistance(
            {
                username,
    
            },
            frameworks
        ); 

        if (usernameExists) {
            
            return {
                headers,
                statusCode: 400,
                body: {
                    message: "UsernameExists taken !"
                }
            }

        }else {

            return {
                headers,
                statusCode: 200,
                body: {
                    message: "You are free to use this username !"
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