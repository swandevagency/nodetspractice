interface validateAdminNameFieldsParams {
    first_name: string, 
    last_name: string,
}

export default ({
    first_name,
    last_name,
}:validateAdminNameFieldsParams) => {
    
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
}
    