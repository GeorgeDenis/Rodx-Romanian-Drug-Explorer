const pool = require("../database/connection");

exports.getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  console.log(result.rows);
  return result.rows;
};
exports.createUser = async (userData) => {
  const { name, email, password } = userData;

  console.log(password);
  const queryText =
    "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *";
  const values = [name, email, password];
  try {
    const result = await pool.query(queryText, values);
    return result.rows[0]; // returneaza utilizatorul creat
  } catch (err) {
    console.error(err);
    throw err;
  }
};
exports.validateUsername = async (name) => {
  try {
    const queryText = "SELECT name FROM users WHERE name =$1";
    const result = await pool.query(queryText, [name]);
    return result.rows.length > 0;
  } catch (err) {
    console.error(err);
    throw new Error("Database query failed");
  }
};
exports.validateEmail = async (email) => {
  try {
    const queryText = "SELECT email FROM users WHERE email =$1";
    const result = await pool.query(queryText, [email]);
    return result.rows.length > 0;
  } catch (err) {
    console.error(err);
    throw new Error("Database query failed");
  }
};

exports.findUserByEmail = async (email) => {
  try {
    // Only select the fields you need
    const queryText = "SELECT name, email, password FROM users WHERE email =$1";
    const result = await pool.query(queryText, [email]);

    if (result.rows.length > 0) {
      // Return the actual user object
      return result.rows[0];
    } else {
      // If no user found, return null
      return null;
    }
  } catch (err) {
    console.error(err);
    // Provide a more specific error message
    throw new Error(`Database query failed: ${err.message}`);
  }
};
exports.findUserByUser = async (username) => {
  try {
    // Only select the fields you need
    const queryText = "SELECT name FROM users WHERE name =$1";
    const result = await pool.query(queryText, [username]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    throw new Error(`Database query failed: ${err.message}`);
  }
};
