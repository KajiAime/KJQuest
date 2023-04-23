const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'kaji',
  password: '1e2b3o4m',
  database: 'my_database'
});
for (const key in connection) {
  console.log(key);
}
const getDataFromDatabase = async () => {
    try {
    //   const [rows] = await connection.query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?');
      const data = JSON.parse(JSON.stringify(rows));
      if (data.length > 0) {
        console.log('Database exists');
      } else {
        console.log('Database does not exist');
      }
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  
  getDataFromDatabase()
    .then(data => console.log(data))
    .catch(error => console.error(error))
    // .finally(() => connection.end());
// connection.query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?', ['my_database'], (error, results, fields) => {
//   if (error) {
//     console.error(error);
//   } else {
    
//   }
// });

// connection.end();