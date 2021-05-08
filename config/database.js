/*const { createPool } = require("mysql");
const pool = createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
});
module.exports = pool;*/


const mysql = require(`mysql-await`);
const pool = mysql.createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "habijabi",
    database: process.env.MYSQL_DB,
    connectionLimit: 10,
});

module.exports = pool;
