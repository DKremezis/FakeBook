require('dotenv').config();
const sql = require('mssql');

var config = {
    server: process.env.DB_SERVER,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
       options:{
           encrypt: true
       }
   };

var executeStatement = (statement) =>{

  return new Promise((resolve,reject) =>{

    const pool1 = new sql.ConnectionPool(config, err => {
        // ... error checks

        // Query
        if (err) console.log(err);

        pool1.request() // or: new sql.Request(pool1)
        .query(statement, (err, result) => {
            // ... error checks
            console.log(result.recordset);
            resolve(result.recordset);
            reject(err);
        });

    });


    pool1.on('error', err => {
        // ... error handler
    });

  });
}



module.exports = {

  executeStatement

}
