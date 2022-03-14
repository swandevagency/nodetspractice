module.exports = () => {
    return new Promise((resolve, reject) => {

        const charecters: [string, string, string, string] = [
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            "abcdefghijklmnopqrstuvwxyz",
            "0123456789",
            `!@#$%^&*?`
    
        ];
    
        let password = "";
        for (let i = 0; i < 12; i++) {
            
            
            if (i < 4) {

                password += charecters[i].charAt(randomDigit(i));
            }else {

                const randomIndex = Math.floor(Math.random() * (4));
                password += charecters[randomIndex].charAt(randomDigit(randomIndex));

            }
            
            
        }
        
        resolve(password);

        function randomDigit(i:number)  {
            return Math.floor(Math.random() * charecters[i].length)
        }
    })

}