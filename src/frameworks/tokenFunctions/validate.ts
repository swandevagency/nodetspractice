export default (jwt:any) => {

    return async ({

        token, 
        key 

    }:any = {}) => {

        const Token = token.split(' ')[1];
        try{
            await jwt.verify(Token, key);
            return true;
        }catch (e) {
            return false;
        }

    };

}