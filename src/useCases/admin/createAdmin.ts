
export default async (

    {

        username = '', 
        first_name = '', 
        last_name ='', 
        email ='',
        password,
        mailPassword = false

    }:any = {},

    generatePassword:any,
    encryption:any,
    generateId:any,
    sendMail:any,
    tokenFunctions:any
) => {
    
    try {

        // importing from enteties & database funcitions

        const {

            admin: {
                validateAdminFields,
                validateAdminName
            }

        } = enteties;

        const {

            admin : {
                createAdmin,
            },

        } = databaseFunctions;

        // generating a safe password for admin if mail password is true

        let generatedPassword;
    
        if (mailPassword === true) {

            generatedPassword = await generatePassword();

        }else {

            generatePassword = password;

        }
        
        // validating admin fields

        await validateAdminName({
            first_name, 
            last_name, 
        })

        const generatedAdmin = validateAdminFields({
            username, 
            email, 
            password: generatedPassword
        });

        // generating uuid

        const generatedId = generateId();

        // generateing admin hash data

        const generatedHash = await encryption.encrypt(generatedId, generatedAdmin.password);

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
        await sendMail.sendPassword({
            email: adminAddedToDatabase.email,
            first_name: adminAddedToDatabase.first_name,
            last_name: adminAddedToDatabase.last_name,
            password: generatedPassword
        });

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