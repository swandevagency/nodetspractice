export default async (

    {
        username,

    }:any = {}
    

) => {
    
    try{

        // importing
        const {

            admin: {
                validateAdminUsername,
            }

        } = enteties;

        const {

            admin : {
                checkUsernameExistance,
            },

        } = databaseFunctions;

        // validating the data before issuing the database

        const {username: validatedUsername} = validateAdminUsername({username});

        // making sure that the admin exists

        return await checkUsernameExistance({username: validatedUsername});

    }catch (error) {
        throw error;
    }

}