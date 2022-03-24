export default async(request:any, useCases:any, frameworks:any) => {

    const headers = {
        'Content-Type': 'application/json'
    };

    const refreshToken = request.cookies.authorization;

    const {

        admin: {
            clearRefreshToken
        }

    } = useCases

    try {

        await clearRefreshToken(
            {
                refreshToken
            },
            frameworks
        );

        return {
            headers,
            statusCode: 200,
            clearCookie: 'authorization',
            body: {
                message: "You have successfully loged out !"
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