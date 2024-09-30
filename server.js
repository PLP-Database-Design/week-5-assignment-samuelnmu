const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database!');
});

// Retrieve all patients
app.get('/patients', (req, res) => {
  db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Retrieve all providers
app.get('/providers', (req, res) => {
  db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Filter patients by First Name
app.get('/patients/:firstName', (req, res) => {
  const firstName = req.params.firstName;
  db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?', [firstName], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Retrieve all providers by their specialty
app.get('/providers/:specialty', (req, res) => {
  const specialty = req.params.specialty;
  db.query('SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?', [specialty], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const PORT = 3300;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//listening to server
app.listen(3300,() =>{
    console.log('server is running')
});