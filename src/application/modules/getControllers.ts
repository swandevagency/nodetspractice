module.exports = async(controllers: any) => {
    
    const controllersBaseURL = "../../controllers";

    return new Promise((resolve, reject) => {

        const importedControllers:any = {};

        controllers.forEach((controller: any) => {
            importedControllers[controller.name] =  require(`${controllersBaseURL}${controller.url}`);
        });

        resolve(importedControllers);

    });

    
}