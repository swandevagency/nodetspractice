module.exports = (items: any, baseURL: string) => {
    
    
    return new Promise(async(resolve, reject) => {

        const importedItems:any = {};

        const DatabaseFunctions = require("../../../config/databaseFunctions");
        
        const Enteties = require("../../../config/enteties");
        
        try {

            const databaseFunctions:any = await require("./getFunctions")(DatabaseFunctions, "../../databaseFunctions");
            const enteties:any = await require("./getFunctions")(Enteties, "../../enteties");
            items.forEach((item: any) => {
                importedItems[item.name] =  require(`${baseURL}${item.url}`)(databaseFunctions, enteties);
            });
    
            resolve(importedItems);
            
        } catch (error) {
            logger.error(error);
        }

        

    });

    
}