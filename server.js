// import { person } from "./datum.js";
var http = require('http');
var url = require('url');
var fs = require('fs');
var mysql = require('mysql');

http.createServer(
    function(req, res){
        var q = url.parse(req.url, true);
        var filename = "." + q.pathname;
        fs.readFile(filename, function(err, data){
            if(err){
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            console.log(filename);
            return res.end();
        });
    }
).listen(8080);

var a = "";

var con = mysql.createConnection({
    database: "kjquest",
    host: "localhost",
    user: "root",
    password: ""
});
con.connect(function(err){
    if(err) throw err;
    con.query("SELECT * FROM answers WHERE id='1'", function(err, result){
        if(err) throw err;
        a = result[0]["question"];
        console.log(result[0]["question"]);
    })
});
export {a};