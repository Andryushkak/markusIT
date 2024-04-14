const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Подключение к базе данных MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

// Парсинг данных POST запросов
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Маршрут для обработки запроса на регистрацию
app.post('/register', (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [first_name, last_name, email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to register user' });
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
});

// Маршрут для обработки запроса на вход
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to login' });
    }
    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful', user: result[0] });
  });
});

// Установка порта для сервера
const PORT = process.env.PORT || 3000;

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
