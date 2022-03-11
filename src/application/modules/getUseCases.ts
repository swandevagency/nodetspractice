import DatabaseFunctions from "../../../config/databaseFunctions";
import Enteties from "../../../config/enteties";
import getFunctions from "./getFunctions";

export default (items: any, baseURL: string) => {
    
    
    return new Promise(async(resolve, reject) => {

        const importedItems:any = {};

        
        
        
        try {

            const databaseFunctions:any = await getFunctions(DatabaseFunctions, "../../databaseFunctions");
            const enteties:any = await getFunctions(Enteties, "../../enteties");
            items.forEach((item: any) => {
                importedItems[item.name] =  require(`${baseURL}${item.url}`)(databaseFunctions, enteties);
            });
    
            resolve(importedItems);
            
        } catch (error) {
            logger.error(error);
        }

        

    });

    
}