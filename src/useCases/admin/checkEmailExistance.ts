export default async (

    {
        email,

    }:any = {}
    

) => {
    
    try{

        // importing
        const {

            admin: {
                validateAdminEmail,
            }

        } = enteties;

        const {

            admin : {
                checkEmailExistance,
            },

        } = databaseFunctions;

        // validating the data before issuing the database

        const {email: validatedEmail} = validateAdminEmail({email});

        // making sure that the admin exists

        return await checkEmailExistance({email: validatedEmail});

    }catch (error) {
        throw error;
    }

}