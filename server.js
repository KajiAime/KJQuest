const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

const con = mysql.createConnection({
    database: "kjquest",
    host: "localhost",
    user: "root",
    password: ""
});
con.connect((err) => {
    if(err){
        console.error('Error connecting to database ', err);
        return;
    }
    console.log('Connected to database!');
});
app.get('/', (req, res) => {
    con.query("SELECT * FROM answers WHERE id='1'", (err, results, fields) => {
        if(err){
            console.error('Error running query: ',err);
            return;
        }
        res.render('index', {users: results });
        console.log(results);
    });
});
app.use(express.static('public'));
app.listen(3000, () => {
    console.log('Server started on: http://127.0.0.1:3000');
});