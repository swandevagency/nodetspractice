module.exports = async(request: any, useCases: any) => {
    
    const {
        test
    } = useCases
    
    return{

        statusCode: 200,
        body: {
            message: "yoyoyooyoyoy",
            userCaseTest: test(2,3)
        }

    }
    
}