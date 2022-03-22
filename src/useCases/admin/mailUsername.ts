export default async (

    {
        email,

    }:any = {},

    sendMail:any

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
                getAdminByEmail,
            },

        } = databaseFunctions;

        // validating the data before issuing the database

        const {email: validatedEmail} = validateAdminEmail({email});

        // making sure that the admin exists

        const adminRetrivedFromDatabase = await getAdminByEmail({
            email: validatedEmail,
        });

        // mailing back username

        await sendMail.sendUsername({
            email: adminRetrivedFromDatabase.email,
            first_name: adminRetrivedFromDatabase.first_name,
            last_name: adminRetrivedFromDatabase.last_name,
            username: adminRetrivedFromDatabase.username
        });

        // returning

        return Object.freeze({
            msg: "Authenticated ! check your email to continue .."
        })

    }catch (error) {
        throw error;
    }

}