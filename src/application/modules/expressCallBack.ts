import UseCases from "../../../config/useCases";
import getUseCases from "./getUseCases";
export default function(controller:any, lable:string = 'asRouteHandler', frameworks: any = {}) {
    
    return (req:any, res:any, next: any) => {

        // creating a httpRequest object to return to enject to a controller

        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            ip: req.ip,
            method: req.method,
            path: req.path,
            headers: req.headers,
            // cookies: req.cookies || {}
        }
        // setting useCases
        
        if (lable === 'asRouteHandler') {
            
            getUseCases(UseCases, "../../useCases").then((useCases: any) =>
    
                controller(httpRequest, useCases, frameworks)
    
            ).then((httpResponse:any) => {
    
                if (httpResponse.headers) {
                    res.set(httpResponse.headers);
                }

                if (httpResponse.cookies) {
                    httpResponse.cookies.forEach((cookie:any) => {
                        const {key, value, options} = cookie;
                        res.cookie(key, value, options);
                    });
                }

                if (httpResponse.clearCookie) {
                    res.clearCookie(httpResponse.clearCookie);
                }

                res.type('json');
                res.status(httpResponse.statusCode).send(httpResponse.body);
    
            })
            .catch((e:any) => {

                console.log(e);
                
                logger.error(e)
                res.status(500).send({ error: 'An unkown error occurred.' })
            });

        }else if (lable === 'asMiddleware') {
            getUseCases(UseCases, "../../useCases").then((useCases: any) =>
    
                controller(httpRequest, useCases, next, frameworks)
    
            ).catch((e:any) => {
                logger.error(e)
                res.status(500).send({ error: 'An unkown error occurred.' })
            });
        }else {
            logger.error('Invalid lable for handler')
            process.exit(0);
        }
        
        
        
  
    }
}