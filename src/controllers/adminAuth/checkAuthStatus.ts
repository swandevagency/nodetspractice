export default async(request: any, useCases: any, frameworks: any) => {

    const refreshToken = request.cookies.authorization;

    const {
        tokenFunctions
    } = frameworks;
    

    const headers = {
        'Content-Type': 'application/json'
    }

    try {

        
        const {
            
            admin: {
                getAuthToken
            }

        } = useCases

        const {tokenExpiresAt, authToken, admin} = await getAuthToken(
            {
                refreshToken
            },
            tokenFunctions
        )
        
        return{
            headers,
            statusCode: 200,
            body: {
                admin,
                authenticated: true,
                tokenExpiresAt,
                authToken
            }
    
        }

    } catch (error: any) {

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