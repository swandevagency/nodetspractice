module.exports = (
    {
        app, 
        controllers, 
        callBack, 
        frameworks,
        ratelimiter

    }:any = {}

) => {
    

    const {

        adminAuth:{
            login,
            register,
            authenticate,
            checkAuthStatus,
            forgotUsername,
            logout,
            checkUsernameExistance,
            checkEmailExistance
        }
    
    } = controllers;

    
    const {
        
        encryption,
        generateId,
        sendMail,
        tokenFunctions,
        
    } = frameworks;

    app.get(

        '/checkExistance/username',

        ratelimiter({
            windowMs: 5000,
            max: 2
        }),

        callBack(checkUsernameExistance, "asRouteHandler")

    );

    app.get(

        '/checkExistance/email',

        ratelimiter({
            windowMs: 5000,
            max: 2
        }),

        callBack(checkEmailExistance, "asRouteHandler")

    )
    
    
    app.post(

        '/register', 

        ratelimiter({
            windowMs: 5000,
            max: 1
        }),

        callBack(register, "asRouteHandler", {

            encryption,
            generateId,
            sendMail,
            tokenFunctions

        })
        
    );
    

    app.post(

        '/login', 

        ratelimiter({
            windowMs: 8000,
            max: 1
        }),

        callBack(login, "asRouteHandler", {

            tokenFunctions,
            sendMail

        })

    );

    app.post(

        '/authenticate', 

        ratelimiter({
            windowMs: 5000,
            max: 3
        }),

        callBack(authenticate, "asRouteHandler", {

            encryption,
            tokenFunctions,
            sendMail,
            generateId

        })

    );

    app.get(

        '/checkAuthStatus', 

        ratelimiter({
            windowMs: 5000,
            max: 7
        }),
        
        callBack(checkAuthStatus, "asRouteHandler", {

            tokenFunctions,
            
        })
    );

    
    app.post(

        '/forgotUsername', 

        ratelimiter({
            windowMs: 5000,
            max: 1
        }),

        callBack(forgotUsername, "asRouteHandler", {

            sendMail

        })
    )

    app.get(

        '/logout', 

        ratelimiter({
            windowMs: 5000,
            max: 1
        }),

        callBack(logout, "asRouteHandler", {

            tokenFunctions

        })

    )


    return app;
    
}