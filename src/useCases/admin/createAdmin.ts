
export default async (

    {

    username = '', 
    first_name = '', 
    last_name ='', 
    email ='',

    } = {},

    generatePassword:any,
    encryption:any,
    generateId:any
) => {
    
    try {

        // importing from enteties & database funcitions

        const {

            admin: {
                validateAdminFields,
            }

        } = enteties;

        const {

            admin : {
                createAdmin,
            }

        } = databaseFunctions;

        // generating a safe password for admin
    
        const generatedPassword = await generatePassword();
        
        // validating admin fields

        const generatedAdmin = validateAdminFields({
            username, 
            first_name, 
            last_name, 
            email, 
            password: generatedPassword
        });

        // generating uuid

        const generatedId = generateId();

        // generateing admin hash data

        const generatedHash = await encryption.encrypt(generatedId, generatedPassword);

        // adding admin to the database
        logger.debug("asdlkj");
        const adminAddedToDatabase = await createAdmin({
            id: generatedId,
            first_name: generatedAdmin.first_name,
            last_name: generatedAdmin.last_name,
            email: generatedAdmin.email,
            username: generatedAdmin.username,
            hashedData: generatedHash
        });

        logger.debug(adminAddedToDatabase);
        // emailing the password and the login link

        // returning the result
    
        return Object.freeze({
            first_name: adminAddedToDatabase.first_name,
            last_name: adminAddedToDatabase.last_name,
            email: adminAddedToDatabase.email,
            username: adminAddedToDatabase.username,
        });

    } catch (error) {
        throw error;
    }
}