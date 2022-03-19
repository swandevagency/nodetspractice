export default async(request: any, useCases: any, frameworks:any) => {

    const {

        username,
        email,
        password

    } = request.body;

    const {

        admin: {
            authenticateAdmin
        }

    } = useCases;

    const {

        encryption,
        tokenFunctions,
        sendMail

    } = frameworks;

    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        
        const token = await authenticateAdmin(
            {
                username,
                email,
                password,
    
            },
            encryption,
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

    } catch (error) {
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