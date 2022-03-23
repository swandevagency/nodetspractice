export default async (

    {
        refreshToken

    }:any = {},

    {

        tokenFunctions
        
    }:any = {}
    

) => {

    const {
        admin: {
            deleteRefreshToken
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

        
        // validating refresh token id
        
        const {tokenId, adminId} = refreshTokenIsValid.payload

        await deleteRefreshToken({tokenId, adminId});


        // returning

        return Object.freeze({
            delete: true
        })

    }catch (error) {
        throw error;
    }

}