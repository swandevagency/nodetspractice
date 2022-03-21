export default async (

    {
        username,
        email,
        password,
        token


    }:any = {},

    encryption:any,
    tokenFunctions:any

) => {
    
    try{

        // importing
        const {

            admin: {
                validateAdminCredentials,
                validateAdminPassword
            }

        } = enteties;

        const {

            admin : {
                getAdminByCredentials,
            },

        } = databaseFunctions;

        // validating the data before issuing the database

        const generatedAdmin = validateAdminCredentials({
            username, 
            email,
        });

        const {password:validatedPassword} = await validateAdminPassword({
            password
        });

        // making sure that the admin exists

        const adminRetrivedFromDatabase = await getAdminByCredentials({
            username: generatedAdmin.username,
            email: generatedAdmin.email,
        });

        if (adminRetrivedFromDatabase.blocked) {
            throw new Error('Access denied !')
        }

        // validating password

        await encryption.decrypt(adminRetrivedFromDatabase.hashedData, validatedPassword);

        // validating token
        
        const tokenIsValid =await tokenFunctions.validate({
            token,
            key: keys.secret.adminEmailAuthToken
        });

        if (!tokenIsValid) {
            throw new Error('Token expired !');
        }

        // generating token


        const refreshToken = await tokenFunctions.generate({
            payload: {   
                id: adminRetrivedFromDatabase.id,
                email: adminRetrivedFromDatabase.email,
                first_name: adminRetrivedFromDatabase.first_name,
                last_name: adminRetrivedFromDatabase.last_name,
            },
            key: keys.secret.adminRefreshToken,
        });

        // returning

        return Object.freeze({
            refreshToken
        })

    }catch (error) {
        throw error;
    }

}