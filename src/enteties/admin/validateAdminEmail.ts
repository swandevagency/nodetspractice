interface validateAdminCredentialsParams {
    email: string, 
}

export default ({
    email,
}:validateAdminCredentialsParams) => {

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