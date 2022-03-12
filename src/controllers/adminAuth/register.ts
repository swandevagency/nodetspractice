export default async(request: any, useCases: any) => {

    const headers = {
        'Content-Type': 'application/json'
    }

    
    try {
        
        const {
            test
        } = useCases
        
        return{
            headers,
            statusCode: 200,
            body: {
                message: "yoyoyooyoyoy",
                userCaseTest: test(2,3)
            }
    
        }

    } catch (error) {

        logger.error(error);

        return{
            headers,
            statusCode: 400,
            body: {
                error: error
            }
    
        }

    }
    
    
    
}