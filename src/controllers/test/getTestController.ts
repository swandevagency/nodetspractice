
module.exports = async(req:any, res:any) => {
    const {databaseInfo} = keys;
    const {Client} = require("pg");
    const client = new Client(databaseInfo);

    try {
        
        client.connect();

        await client.query("BEGIN");

        await client.query(`insert into person (first_name, last_name, email, gender, date_of_birth, country_of_birth) values ('Prentice', 'Thumann', null, 'Female', '2021-12-08', 'China')`);

        const {rows} = await client.query(`SELECT * FROM person`);

        await client.query("commit");

        res.status(200).send({yo:rows});
        
    } catch (error) {
        console.log(error);
        
    }
    

}