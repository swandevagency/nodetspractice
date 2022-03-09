module.exports = (app: any, baseURL : string) => {

    // setting the routes
    app.use(`${baseURL}/test`, require('./test/index'));

    // app.use(`${baseURL}/admin`, require('./admin/index'));
    
}