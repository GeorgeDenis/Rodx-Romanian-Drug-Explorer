const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "TW",
  password: "Monster02@",
  port: 5432,
});

module.exports = pool;
