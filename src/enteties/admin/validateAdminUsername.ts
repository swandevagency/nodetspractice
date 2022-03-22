interface validateAdminCredentialsParams {
    username: string, 

}

export default ({
    username,
}:validateAdminCredentialsParams) => {

    // username validation

    if (!username || typeof username !== "string") {
        throw new Error ("username field is required and it must be a string !");
    }

    if (username.length > 50) {
        throw new Error ("username can not have more than 50 charecters !");
    }

    // return statment

    return Object.freeze({
        username,
    });

   
}