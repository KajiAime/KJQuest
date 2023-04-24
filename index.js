const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const list = require('./classes/linkedlist.js');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');

// passport.use(new LocalStrategy(
//     (username, password, done) => {
//         User.findOne({ username: username }, (err, user) => {
//             if (err) { return done(err); }
//             if (!user) { return done(null, false); }
//             if (!user.verifyPassword(password)) { return done(null, false); }
//             return done(null, user);
//         });
//     }
// ));
  
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });
  
// passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//       done(err, user);
//     });
// });
  
// app.use(session({
//     secret: 'mysecretkey',
//     resave: false,
//     saveUninitialized: true
// }));
  
// app.use(passport.initialize());
// app.use(passport.session());
  
// app.post('/login',
//     passport.authenticate('local', {    successRedirect: '/',
//                                         failureRedirect: '/login' }));
  
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

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

// app.use(session({
//     secret: 'mysecretkey',
//     resave: false,
//     saveUninitialized: true
// }));

app.get('/answer', (req, res) => {
    if (req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    con.query("SELECT * FROM answers WHERE id='1'", (err, results, fields) => {
        if(err){
            console.error('Error running query: ',err);
            return;
        }
        res.render('index', {users: results });
        console.log(results);
    });
});
app.get('/', (req, res) => {
    res.render('logAdmin');
})
app.get('/form', (req, res) =>{
    res.render('form');
});
app.get('/adminSubmit', (req, res) => {
    const data = req.body.userName;
    con.query(`SELECT * FROM userinfo WHERE userName = ?`, [data], (error, result) => {
        if(error) throw error;
        if(req.body.passWord === result.passWord){
            res.render('setQuest', {name: result.userName})
        } else {
            res.render('loginAdmin', {text: "Incorrect credentials! Try again."})
        }
    });
})
// app.get('')
app.use(express.static('public'));
app.listen(3000, () => {
    console.log('Server started on: http://127.0.0.1:3000');
});
