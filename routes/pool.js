var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 10, // Adjust this value based on your application's needs
  host: 'localhost',
  user: 'root',
  password: '8982008982nicky',
  database: 'cinemadb',
  multipleStatements: true
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database!');
    connection.release(); // Release the connection back to the pool
  }
});

module.exports = pool;
