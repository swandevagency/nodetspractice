export default async(request: any, useCases: any) => {

    const {
        username, 
        first_name, 
        last_name, 
        email
    } = request.body;

    const {
        admin: {
            createAdmin
        }
    } = useCases;

    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        

        return {
            statusCode: 200,
            body: {
                message: "admin created !",
                email: createAdmin.email,
            }
        }

    } catch (error) {
        
    }
    
}