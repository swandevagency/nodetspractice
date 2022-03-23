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
            authenticate,
            checkAuthStatus,
            forgotUsername,
            logout
        }
    
    } = controllers;

    
    const {
        
        encryption,
        generateId,
        sendMail,
        tokenFunctions
        
    } = frameworks;
    
    
    
    app.post('/register', callBack(register, "asRouteHandler", {

        encryption,
        generateId,
        sendMail,
        tokenFunctions

    }));
    

    app.post('/login', callBack(login, "asRouteHandler", {

        tokenFunctions,
        sendMail

    }));


    app.post('/authenticate', callBack(authenticate, "asRouteHandler", {

        encryption,
        tokenFunctions,
        sendMail,
        generateId

    }));


    app.get('/checkAuthStatus', callBack(checkAuthStatus, "asRouteHandler", {

        tokenFunctions,
        
    }));


    app.post('/forgotUsername', callBack(forgotUsername, "asRouteHandler", {

        sendMail

    }))

    // logout

    app.get('/logout', callBack(logout, "asRouteHandler"))

    // check for notifications

    return app;
    
}