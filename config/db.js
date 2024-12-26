const mysql2 = require('mysql2')

const db = mysql2.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user:"root",
    password: "13246879",
    database: "treinandocrud"
});

module.exports = db;