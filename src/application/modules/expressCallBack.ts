import UseCases from "../../../config/useCases";
import getUseCases from "./getUseCases";
export default function(controller:any, isMiddleware:boolean = false) {
    
    return (req:any, res:any, next: any) => {

        // creating a httpRequest object to return to enject to a controller

        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            ip: req.ip,
            method: req.method,
            path: req.path,
            headers: req.headers
        }
        logger.debug(isMiddleware);
        // setting useCases

        if (!isMiddleware) {
            
            getUseCases(UseCases, "../../useCases").then((useCases: any) =>
    
                controller(httpRequest, useCases)
    
            ).then((httpResponse:any) => {
    
                if (httpResponse.headers) {
                    res.set(httpResponse.headers);
                }
                res.type('json');
                res.status(httpResponse.statusCode).send(httpResponse.body);
    
            })
            .catch((e:any) => {
                logger.error(e)
                res.status(500).send({ error: 'An unkown error occurred.' })
            });

        }else {
            getUseCases(UseCases, "../../useCases").then((useCases: any) =>
    
                controller(httpRequest, useCases, next)
    
            ).catch((e:any) => {
                logger.error(e)
                res.status(500).send({ error: 'An unkown error occurred.' })
            });
        }
        
        
        
  
    }
}