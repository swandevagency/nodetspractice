module.exports = async(items: any, baseURL: string) => {
    
    
    return new Promise((resolve, reject) => {

        const importedItems:any = {};

        items.forEach((item: any) => {
            importedItems[item.name] =  require(`${baseURL}${item.url}`);
        });

        resolve(importedItems);

    });

    
}