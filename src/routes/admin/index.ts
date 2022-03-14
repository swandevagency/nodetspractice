module.exports = (app:any, controllers:any, callBack:any, frameworks:any) => {

    const {

        adminAuth:{
            login,
            register,
            checkAuthStatus
        }
    
    } = controllers;

    const {
        generatePassword
    } = frameworks;
    
    
    app.post('/register', callBack(register, "asRouteHandler", {
        generatePassword
    }));

    app.get('/login', callBack(login, "asRouteHandler"));
    app.get('/checkAuthStatus', callBack(checkAuthStatus, "asRouteHandler"));

    return app;
    
}