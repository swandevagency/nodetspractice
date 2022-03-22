export default async ({
    email,
    first_name,
    last_name,
    username
}:any = {}) => {
    
    // TODO : generate a email plugin !

    const msg = `To:${email}\nhi ${first_name} ${last_name} !\nyour username is : ${username}`

    logger.debug(msg)

}