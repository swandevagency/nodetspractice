import DatabaseFunctions from "../../../config/databaseFunctions";
import Enteties from "../../../config/enteties";
import getFunctions from "./getFunctions";

export default (items: any, baseURL: string) => {
    
    
    return new Promise(async(resolve, reject) => {

        const importedItems:any = {};
        
        
        try {

            global.databaseFunctions = await getFunctions(DatabaseFunctions, "../../databaseFunctions");
            global.enteties = await getFunctions(Enteties, "../../enteties");
            
            items.forEach((item: any) => {
                importedItems[item.name] =  require(`${baseURL}${item.url}`);
            });
    
            resolve(importedItems);
            
        } catch (error) {
            logger.error(error);
        }

        

    });

    
}