export default async() => {

    const headers = {
        'Content-Type': 'application/json'
    };

    try {

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