export default (decryptionFunction:any) => {

    return (encryptedText:string, key:string) => {
        try{
            const decrypt = decryptionFunction('aes256', key);
            let decrypted = decrypt.update(encryptedText, 'hex', 'utf8')
            decrypted += decrypt.final()
            return decrypted
        }
        catch(ex)
        {
            return ex;
        }
    
    }

}