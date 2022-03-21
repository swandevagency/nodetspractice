interface validateAdminCredentialsParams {
    username: string, 
    email: string, 

}

export default ({
    username,
    email,
}:validateAdminCredentialsParams) => {

    // username validation

    if (!username || typeof username !== "string") {
        throw new Error ("username field is required and it must be a string !");
    }

    if (username.length > 50) {
        throw new Error ("username can not have more than 50 charecters !");
    }

    // email validation

    if (!email) {
        throw new Error ("email is required !")
    }

    if (typeof email !== "string" || !emailIsValid(email)) {
        throw new Error ("this email is not valid !");
    }

    if (email.length > 150) {
        throw new Error ("email can not have more than 150 charecters !");
    }

    // return statment

    return Object.freeze({
        username,
        email,
    });

    // functions

    function emailIsValid (email: string)  {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
}