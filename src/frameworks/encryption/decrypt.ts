export default (decryptionFunction:any) => {

    return (encryptedText:string, key:string) => {
        try{
            const decrypt = decryptionFunction('aes256', key);
            let decrypted = decrypt.update(encryptedText, 'hex', 'utf8')
            decrypted += decrypt.final()
            return true;
        }
        catch(ex)
        {
            throw new Error("Invalid credentials !");
        }
    
    }

}