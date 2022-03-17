export default (encryptionFunction:any) => {

    return (plainText:any, key:any) =>{
 
        const encrypt = encryptionFunction('aes256', key);
        let encrypted = encrypt.update(plainText, 'utf8', 'hex');
        encrypted += encrypt.final('hex')
        return encrypted;
    }

}