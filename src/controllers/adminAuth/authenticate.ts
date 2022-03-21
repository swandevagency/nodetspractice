export default async(request: any, useCases: any, frameworks:any) => {

    const {

        username,
        email,
        password,

    } = request.body;

    const token = request.headers.authorization;
    

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
        
        const {refreshToken} = await authenticateAdmin(
            {
                username,
                email,
                password,
                token
    
            },
            encryption,
            tokenFunctions,
            sendMail
        ); 

        return {
            headers,
            statusCode: 200,
            cookies: [
                {
                    name: 'authorization',
                    value: refreshToken,
                    options: {
                        maxAge: 5000,
                        expires: new Date('26 July 2050'),
                        sameSite: true,
                        httpOnly: true,
                        secure: true,
                        domain: 'example.com',
                    }
                }
            ],
            body: {
                msg: 'Authenticated !'
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