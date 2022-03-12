module.exports = (app:any, controllers:any, callBack:any) => {

    const {

        adminAuth:{
            login,
            register,
            checkAuthStatus
        }
    
    } = controllers;
    
    
    app.get('/login', callBack(login));
    app.get('/register', callBack(register));
    app.get('/checkAuthStatus', callBack(checkAuthStatus));

    return app;
    
}