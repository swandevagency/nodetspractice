import productionKeys from "../../config/keys/production";
import developmentKeys from "../../config/keys/development";
import dotenv from "dotenv";

export default  () => {
    //configuring the dovenv
    dotenv.config();

    // defining the devKey && prod Key
    const keys = () => {
        
        if (process.env.NODE_ENV === 'production') {

            return productionKeys;

        }

        return developmentKeys;

    }
    
    global.keys = keys();
     
}