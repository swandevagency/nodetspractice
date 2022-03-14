interface validateAdminFieldsParams {
    username: string, 
    first_name: string, 
    last_name: string, 
    email: string, 
    password: string
}

export default ({
    username,
    first_name,
    last_name,
    email,
    password
}:validateAdminFieldsParams) => {

    // username validation

    if (!username || typeof username !== "string") {
        throw new Error ("username field is required and it must be a string !");
    }

    if (username.length > 50) {
        throw new Error ("username can not have more than 50 charecters !");
    }

    // first name validation

    if (!first_name || typeof first_name !== "string") {
        throw new Error ("first_name is required and it must be a string !");
    }

    if (first_name.length > 50) {
        throw new Error ("first_name can not have more than 50 charecters !");
    }

    // last name validation

    if (!last_name || typeof last_name !== "string") {
        throw new Error ("last_name is required and it must be a string !");
    }

    if (last_name.length > 50) {
        throw new Error ("last_name can not have more than 50 charecters !");
    }

    // email validation

    if (!email) {
        throw new Error ("email is required and ")
    }

    if (typeof email !== "string" || !emailIsValid(email)) {
        throw new Error ("this email is not valid !");
    }

    if (email.length > 150) {
        throw new Error ("email can not have more than 150 charecters !");
    }

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
        username,
        last_name,
        first_name,
        email,
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

    function emailIsValid (email: string)  {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
}