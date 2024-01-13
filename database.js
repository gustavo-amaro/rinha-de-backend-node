require("dotenv").config({
  path: ".env",
});

const connection = {
  dialect: process.env.DB_DIALECT || "mysql",
  //storage: path.resolve(__dirname, "../../__tests__/database.sqlite"),
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
  },
};

module.exports = connection;
