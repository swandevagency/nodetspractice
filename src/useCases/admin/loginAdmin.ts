export default async (

    {
        username,
        email,

    }:any = {},

    tokenFunctions:any,
    sendMail:any

) => {
    
    try{

        // importing
        const {

            admin: {
                validateAdminCredentials,
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

        // making sure that the admin exists

        const adminRetrivedFromDatabase = await getAdminByCredentials({
            username: generatedAdmin.username,
            email: generatedAdmin.email,
        });


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
            msg: "Authenticated ! check your email to continue .."
        })

    }catch (error) {
        throw error;
    }

}