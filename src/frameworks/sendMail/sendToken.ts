export default async ({
    email,
    first_name,
    last_name,
    token
}:any = {}) => {
    
    // TODO : generate a email plugin !

    const msg = `To:${email}\nhi ${first_name} ${last_name} !\nyour token is : ${token}`

    logger.debug(msg)

}