const { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
    host: "localhost",
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432
});