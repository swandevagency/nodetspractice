
module.exports = () => {
    //configuring the dovenv
    const dotenv = require("dotenv")
    dotenv.config();


    // defining the devKey && prod Key
    const keys = () => {
        
        if (process.env.NODE_ENV === 'production') {

            return require('./store/production')

        }

        return require('./store/development');

    }

    return keys() ;
     
}