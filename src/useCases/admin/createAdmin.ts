
export default async (

    {

    username = '', 
    first_name = '', 
    last_name ='', 
    email ='',

    } = {},

    generatePassword:any
) => {
    
    try {

        const {
            admin: {
                validateAdminFields,
            }
        } = enteties;
    
        const generatedPassword = await generatePassword();
        
    
        const generatedAdmin = validateAdminFields({
            username, 
            first_name, 
            last_name, 
            email, 
            password: generatedPassword
        });
    
        return Object.freeze({
            first_name: generatedAdmin.first_name,
            last_name: generatedAdmin.last_name,
            email: generatedAdmin.email,
            username: generatedAdmin.username,
        });

    } catch (error) {
        throw new Error(error.message);
    }
}