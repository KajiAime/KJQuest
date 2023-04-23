const express = require('express')
const mysql = require('mysql')

const app = express()
app.use(express.json())
app.use(express.static('public'))

// Database connection 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  database: 'kjquest'
})

// Admin registration
app.post('/admin/register', (req, res) => {
  const name = req.body.name
  const password = req.body.password
  db.query('INSERT INTO admins (name, password) VALUES (?,?)', [name, password], (err, result) => {
    if (err) throw err 
    res.send('Admin registered!')
  })
})

// User registration
app.post('/user/register', (req, res) => {
  const name = req.body.name
  const password = req.body.password
  db.query('INSERT INTO users (name, password) VALUES (?,?)', [name, password], (err, result) => {
    if (err) throw err 
    res.send('User registered!')
  }) 
})

// Admin adds questions
app.post('/admin/add-questions', (req, res) => {
  const adminName = req.body.adminName
  const questions = req.body.questions 
  const answers = req.body.answers 
  const correctAnswers = req.body.correctAnswers
  const timeLimit = req.body.timeLimit
  // Add questions to database
  db.query('INSERT INTO questions (admin_id, question, option1, option2, option3, option4, answer, time_limit) VALUES (?,?,?,?,?,?,?,?)', 
  [adminName, questions, answers[0], answers[1], answers[2], answers[3], correctAnswers, timeLimit], 
  (err, result) => {
    if (err) throw err
    res.send('Questions added!')
  })
})

// User searches for questions 
app.get('/user/search-questions', (req, res) => {
  const adminName = req.query.adminName
  db.query('SELECT * FROM questions WHERE admin_id = ?', adminName, (err, result) => {
    if (err) throw err 
    res.send(result)
  })
})

app.listen(3000, () => console.log('Server started on port 3000'))
