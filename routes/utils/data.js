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
      })
    })
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) return reject(err);
        resolve();
      })
    })
  }
}

module.exports = Database;
