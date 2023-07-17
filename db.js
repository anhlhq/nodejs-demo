const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root2",
  password: "123456",
  database: "demo",
});

module.exports = connection;
