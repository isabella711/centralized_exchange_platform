const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', // Use your MySQL username
  password: 'password', // Use your MySQL password
  database: 'user_auth_db', // Use your MySQL database name
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Insert a new user into the MySQL database
  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  connection.query(query, [email, password], (err, result) => {
    if (err) {
	res.status(500).send('An internal server error occurred');
    } else {
    	res.status(201).send('User registered successfully');
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists and the password matches
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, result) => {
    if (err) {
		res.status(500).send('An internal server error occurred');
    } else {
    	 if (result.length > 0) {
			res.status(200).send('Login successful');
			} else {
			res.status(401).send('Incorrect email or password');
		 }
    }

   
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

