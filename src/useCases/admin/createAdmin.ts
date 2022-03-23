export default async (

    {

        username = '', 
        first_name = '', 
        last_name ='', 
        email ='',
        password,

    }:any = {},

    encryption:any,
    generateId:any,
    sendMail:any,
    tokenFunctions:any
) => {
    
    try {

        // importing from enteties & database funcitions
        

        const {

            admin: {
                validateAdminEmail,
                validateAdminUsername,
                validateAdminName,
                validateAdminPassword
            }

        } = enteties;

        const {

            admin : {
                createAdmin,
            },

        } = databaseFunctions;
        // validating admin fields

        const {last_name: validatatedFirstName, last_name: validatatedLastName} =await validateAdminName({
            first_name,
            last_name, 
        })

        const {username: validatedUsername} = validateAdminUsername({username});

        const {email: validatedEmail} = validateAdminEmail({email});

        const {password:validatedPassword} = await validateAdminPassword({
            password
        });

        
        // generating uuid
        
        const generatedId = generateId();

        // generateing admin hash data

        const generatedHash = await encryption.encrypt(generatedId, validatedPassword);

        
        // adding admin to the database
        
        const adminAddedToDatabase = await createAdmin({
            id: generatedId,
            first_name: validatatedFirstName,
            last_name: validatatedLastName,
            username: validatedUsername,
            email: validatedEmail,
            hashedData: generatedHash
        });

        // generating a token

        const token = await tokenFunctions.generate({
            payload: {   
                id: adminAddedToDatabase.id,
                email: adminAddedToDatabase.email,
                first_name: adminAddedToDatabase.first_name,
                last_name: adminAddedToDatabase.last_name,
            },
            key: keys.secret.adminEmailAuthToken,
            expireTime: '120'
        })
        
        // mailing the token !

        await sendMail.sendToken({
            email: adminAddedToDatabase.email,
            first_name: adminAddedToDatabase.first_name,
            last_name: adminAddedToDatabase.last_name,
            token
        });

        // returning the request !

        return Object.freeze({
            message: "Admin created !"
        })

    } catch (error) {
        throw error;
    }
}