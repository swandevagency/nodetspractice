interface validateAdminPasswordParams {
    password: string, 

}

export default ({

    password

}:validateAdminPasswordParams) => {

    // password validation
    

    if (!password || typeof password !== "string") {
        throw new Error ("password is required and it must be string !");
    }

    if (password.length < 12) {
        throw new Error ("password must contain atleast 12 digits !");
    }

    if (!hasLowerCase(password)) {
        throw new Error ("password must contain atleast one lowerlace letter !");
    }

    if (!hasUpperCase(password)) {
        throw new Error ("password must contain atleast one uppercase letter !");
    }

    if (!hasSymbols(password)) {
        throw new Error ("password must contain atleast one symbol !");
    }

    if (!hasNumber(password)) {
        throw new Error ("password must contain atleast one number !");
    }

    
    // return statment

    return Object.freeze({
        password
    });

    // functions

    function hasLowerCase(str: string) {
        return str.toUpperCase() != str;
    }
    
    function hasUpperCase(str: string) {
        return str.toLowerCase() != str;
    }
    
    function hasSymbols(str: string) {
        const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return regex.test(str);
    }
    
    function hasNumber(str: string) {
        return /\d/.test(str)
    }
}





