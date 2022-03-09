module.exports = (app:any, controllers:any, callBack:any) => {

    const {

        user:{
            test
        }
    
    } = controllers;
    
    
    app.get('/', callBack(test));

    return app;
    
}