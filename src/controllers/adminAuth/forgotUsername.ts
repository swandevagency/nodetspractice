export default async(request: any, useCases: any, frameworks:any) => {

    const {

        email,

    } = request.body;

    const {

        admin: {
            mailUsername
        }

    } = useCases;

    const {

        sendMail

    } = frameworks;

    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        
        await mailUsername(
            {
                email,
    
            },
            sendMail
        ); 

        return {
            headers,
            statusCode: 200,
            body: {
                message: "Username was sent to your email !"
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