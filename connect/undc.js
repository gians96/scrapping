const mysql = require('mysql2');
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.host_undc,
    user: process.env.user_undc,
    password: process.env.password_undc,
    database: process.env.database_undc
});

const year = process.env.year
module.exports = { connection, year }