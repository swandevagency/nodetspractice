module.exports = (app: any, baseURL : string) => {
    // setting the routes
    console.log(`${baseURL}/test`);
    
    app.use(`${baseURL}/test`, require('./test/index'));
}