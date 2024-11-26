const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0303',
  database: 'thunder'
});

db.connect((err) => {
  if(err) throw err;
  console.log('connected to database');
});

module.exports = db;