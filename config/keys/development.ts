export default  {

    serverInfo: {
        port: 8080,
        baseURL: '/api/v1',
        
    },

    databaseInfo: {
        user: "kouroshtajalliepour",
        password: "13736777kt7",
        host: "localhost",
        port: 5432,
        database: "test"
    },

    corsPolicies: {
        origin: '*',
    
        methods: '*',
    
        allowedHeaders: [
            'Content-Type',
            'authorization',
        ],
    },

    secret: {
        adminEmailAuthToken: "yoyoyoyoyo"
    }
    
}