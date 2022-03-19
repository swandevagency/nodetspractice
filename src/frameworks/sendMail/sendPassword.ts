export default async ({
    email,
    first_name,
    last_name,
    password
}:any = {}) => {
    
    // TODO : generate a email plugin !

    const msg = `To:${email}\nhi ${first_name} ${last_name} !\nyour password is : ${password}`

    logger.debug(msg)

}