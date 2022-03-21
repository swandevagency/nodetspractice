export default async (

    {

        username = '', 
        first_name = '', 
        last_name ='', 
        email ='',
        password,
        mailPassword = false

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
                validateAdminCredentials,
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

        await validateAdminName({
            first_name, 
            last_name, 
        })

        const generatedAdmin = validateAdminCredentials({
            username, 
            email, 
        });

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
            first_name,
            last_name,
            email: generatedAdmin.email,
            username: generatedAdmin.username,
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
        
        // mailing the password
        if (mailPassword) {
            
            await sendMail.sendPassword({
                email: adminAddedToDatabase.email,
                first_name: adminAddedToDatabase.first_name,
                last_name: adminAddedToDatabase.last_name,
                password: validatedPassword
            });
    
        }
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