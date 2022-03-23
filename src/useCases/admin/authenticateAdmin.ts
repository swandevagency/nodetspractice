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
                validateAdminEmail,
                validateAdminUsername,
                validateAdminPassword
            }

        } = enteties;

        const {

            admin : {
                getAdminByCredentials,
                confirmAdmin
            },

        } = databaseFunctions;

        // validating the data before issuing the database

        const {username: validatedUsername} = validateAdminUsername({username});

        const {email: validatedEmail} = validateAdminEmail({email});

        const {password:validatedPassword} = await validateAdminPassword({
            password
        });

        // making sure that the admin exists

        const adminRetrivedFromDatabase = await getAdminByCredentials({
            username: validatedUsername,
            email: validatedEmail,
        });

        // blocking access to blocked admins !

        if (adminRetrivedFromDatabase.blocked) {
            throw new Error('Access denied !')
        }

        
        // confirming admin 
        
        if (adminRetrivedFromDatabase.confirmed) {
            await confirmAdmin({id: adminRetrivedFromDatabase.id});
        }

        // validating password

        await encryption.decrypt(adminRetrivedFromDatabase.hashedData, validatedPassword);

        // validating token
        
        
        const tokenIsValid =await tokenFunctions.validate({
            token,
            key: keys.secret.adminEmailAuthToken
        });

        

        if (
            !tokenIsValid || 
            !tokenIsValid.payload || 
            !tokenIsValid.payload.id ||
            tokenIsValid.payload.id !== adminRetrivedFromDatabase.id
        ) {
            throw new Error('Token expired !');
        }

        // generating refresh token

        const payload = {   
            id: adminRetrivedFromDatabase.id,
            email: adminRetrivedFromDatabase.email,
            first_name: adminRetrivedFromDatabase.first_name,
            last_name: adminRetrivedFromDatabase.last_name,
        };

        const {adminRefreshToken, adminAuthToken} = keys.secret
        
        const refreshToken = await tokenFunctions.generate({
            payload,
            key: adminRefreshToken,
        });

        // generating auth token

        const expireTime = 60 * 15;
        

        const authToken = await tokenFunctions.generate({
            payload,
            key: adminAuthToken,
            expireTime
        });

        // returning

        return Object.freeze({
            refreshToken,
            admin: {
                firstName: adminRetrivedFromDatabase.first_name,
                lastName: adminRetrivedFromDatabase.last_name,
                email: adminRetrivedFromDatabase.email,
            },
            authToken,
            tokenExpiresAt: `${expireTime.toString()} seconds`
        })

    }catch (error) {
        throw error;
    }

}