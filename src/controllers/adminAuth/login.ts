export default async(request: any, useCases: any, frameworks:any) => {

    const {

        username,
        email,

    } = request.body;

    const {

        admin: {
            loginAdmin
        }

    } = useCases;

    const {

        tokenFunctions,
        sendMail

    } = frameworks;

    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        
        const token = await loginAdmin(
            {
                username,
                email,
    
            },
            tokenFunctions,
            sendMail
        ); 

        return {
            headers,
            statusCode: 200,
            body: {
                message: token.msg
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