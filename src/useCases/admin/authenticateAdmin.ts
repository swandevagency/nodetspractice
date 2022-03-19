export default async (

    {
        username,
        email,
        password,

    }:any = {},

    encryption:any,
    tokenFunctions:any,
    sendMail:any

) => {
    
    try{

        // importing
        const {

            admin: {
                validateAdminFields,
            }

        } = enteties;

        const {

            admin : {
                getAdmin,
            },

        } = databaseFunctions;

        // validating the data before issuing the database

        const generatedAdmin = validateAdminFields({
            username, 
            email,
            password
        });

        // making sure that the admin exists

        const adminRetrivedFromDatabase = await getAdmin({
            username: generatedAdmin.username,
            email: generatedAdmin.email,
        });

        // validating password

        await encryption.decrypt(adminRetrivedFromDatabase.hashedData, password);

        // generating token

        const token = await tokenFunctions.generate({
            payload: {   
                id: adminRetrivedFromDatabase.id,
                email: adminRetrivedFromDatabase.email,
                first_name: adminRetrivedFromDatabase.first_name,
                last_name: adminRetrivedFromDatabase.last_name,
            },
            key: keys.secret.adminEmailAuthToken,
            expireTime: '120'
        });

        // mailing back token

        await sendMail.sendToken({
            email: adminRetrivedFromDatabase.email,
            first_name: adminRetrivedFromDatabase.first_name,
            last_name: adminRetrivedFromDatabase.last_name,
            token
        });

        // returning

        return Object.freeze({
            msg: "yoyoyo"
        })

    }catch (error) {
        throw error;
    }

}