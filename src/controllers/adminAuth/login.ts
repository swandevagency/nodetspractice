export default async(request: any, useCases: any, next: any) => {

    logger.debug("the middleware is working !");
    next();
    
}