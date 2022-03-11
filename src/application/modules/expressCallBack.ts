module.exports = function(controller:any) {
    
    return (req:any, res:any) => {

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

        // setting useCases
        const UseCases = require("../../../config/useCases");

        require("./getUseCases")(UseCases, "../../useCases").then((useCases: any) =>

            controller(httpRequest, useCases)

        ).then((httpResponse:any) => {

            if (httpResponse.headers) {
                res.set(httpResponse.headers);
            }
            res.type('json');
            res.status(httpResponse.statusCode).send(httpResponse.body);

        })
        .catch((e:any) => res.status(500).send({ error: 'An unkown error occurred.' }))
        
        
  
    }
}