const mysql = require("mysql");

class Database {
  //create a new connection
  constructor() {
    this.connection = mysql.createPool({
      connectionLimit: 100,
      host: process.env.DB_HOST,
      // Your port; if not 3306
      port: 3306,
      // Your username
      user: process.env.DB_USER,
      // Your password
      password: process.env.DB_PW,
      database: process.env.DB_DB
    });

    this.connection.getConnection((err, connection) => {
      if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
          console.error("Database connection was closed.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
          console.error("Database has too many connections.");
        }
        if (err.code === "ECONNREFUSED") {
          console.error("Database connection was refused.");
        }
      }
      if (connection) connection.release();

      return;
    });
  }

  //takes an sql string and optional array of parameters
  query(sql, args) {
    //returns a promise object
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        //if there's an error, promise gets rejected
        if (err) return reject(err);
        //promise is resolved when finished executing
        resolve(rows);
      });
    });
  }
}

const database = new Database();

module.exports = database;
