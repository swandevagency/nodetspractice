module.exports = async(request: any) => {

    console.log(request.body);
    
    return{
        
        statusCode: 200,
        body: {
            message: "yoyoyooyoyoy"
        }

    }
    
}