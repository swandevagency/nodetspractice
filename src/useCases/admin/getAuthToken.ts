export default async (

    {
        refreshToken

    }:any = {},

    tokenFunctions:any,

) => {

    const {
        admin: {
            getAdminById
        }
    } = databaseFunctions;
    
    try{

        // validating refresh token

        const refreshTokenIsValid = await tokenFunctions.validate({
            token: refreshToken,
            key: keys.secret.adminRefreshToken,
        });

        if (!refreshTokenIsValid) {
            throw new Error('Invalid refresh token !');
        }

        const expireTime = 60 * 15;

        const id = refreshTokenIsValid.payload.id;

        const admin = await getAdminById({id});

        if (admin.blocked) {
            throw new Error('Access denied !');
        }

        const authToken = await tokenFunctions.generate({
            payload: refreshTokenIsValid.payload,
            key: keys.secret.adminAuthToken,
            expireTime
        });


        // returning

        return Object.freeze({
            admin: {
                firstName: admin.first_name,
                lastName: admin.last_name,
                email: admin.email,
            },
            authToken,
            tokenExpiresAt: `${expireTime.toString()} seconds`
        })

    }catch (error) {
        throw error;
    }

}