require("dotenv").config({
  path: ".env",
});

const connection = {
  dialect: process.env.DB_DIALECT || "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

module.exports = connection;
