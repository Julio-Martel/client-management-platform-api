const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Climax4561@",
    database: "my_app"
});

module.exports = pool.promise;