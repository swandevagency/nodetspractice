module.exports = (
    {
        app, 
        controllers, 
        callBack, 
        frameworks
    }:any = {}
) => {
    

    const {

        adminAuth:{
            login,
            register,
            checkAuthStatus,
        }
    
    } = controllers;

    
    const {
        
        generatePassword,
        encryption,
        generateId,
        sendMail,
        tokenFunctions
        
    } = frameworks;
    
    
    
    app.post('/register', callBack(register, "asRouteHandler", {

        generatePassword,
        encryption,
        generateId,
        sendMail,
        tokenFunctions

    }));
    

    app.post('/login', callBack(login, "asRouteHandler", {

        encryption,
        tokenFunctions,
        sendMail

    }));


    app.get('/checkAuthStatus', callBack(checkAuthStatus, "asRouteHandler"));

    return app;
    
}