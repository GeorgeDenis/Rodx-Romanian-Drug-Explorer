const pool = require("../database/connection");

exports.getAllUsers = async () => {
  const result = await pool.query(
    "SELECT user_id, name, email FROM users WHERE role = $1",
    ["user"]
  );
  return result.rows;
};
exports.createUser = async (userData) => {
  const { name, email, password, role } = userData;

  const queryText =
    "INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING *";
  const values = [name, email, password, role];
  try {
    const result = await pool.query(queryText, values);
    return result.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
exports.checkUsername = async (name) => {
  try {
    const queryText = "SELECT name FROM users WHERE name =$1";
    const result = await pool.query(queryText, [name]);
    return result.rows.length > 0;
  } catch (err) {
    console.error(err);
    throw new Error("Database query failed");
  }
};
exports.checkEmail = async (email) => {
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
    const queryText =
      "SELECT name, email, password,role FROM users WHERE email =$1";
    const result = await pool.query(queryText, [email]);

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
exports.getUserId = async (email) => {
  try {
    const queryText = "SELECT user_id FROM users WHERE email =$1";
    const result = await pool.query(queryText, [email]);

    if (result.rows.length > 0) {
      return result.rows[0]["user_id"];
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    throw new Error(`Database query failed: ${err.message}`);
  }
};

exports.findUserByUser = async (username) => {
  try {
    const queryText = "SELECT * FROM users WHERE name =$1";
    const result = await pool.query(queryText, [username]);
    if (result.rows.length > 0) {
      return {
        id: result.rows[0].user_id,
        name: result.rows[0].name,
        email: result.rows[0].email,
        password: result.rows[0].password,
        role: result.rows[0].role,
      };
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    throw new Error(`Database query failed: ${err.message}`);
  }
};

exports.deleteUser = async (email) => {
  try {
    const queryText = "DELETE FROM users WHERE email=$1";
    const result = await pool.query(queryText, [email]);

    if (result.rowCount === 0) {
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    throw new Error("Database query failed");
  }
};

exports.updateUserPassword = async function (username, newHashedPassword) {
  const queryText = "UPDATE users SET password = $1 WHERE name = $2";
  const queryParams = [newHashedPassword, username];

  try {
    const res = await pool.query(queryText, queryParams);
    if (res.rowCount === 0) {
      throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
exports.updateUserAccount = async function (
  username,
  email,
  newName,
  newEmail
) {
  const queryText =
    "UPDATE users SET name = $1, email = $2 WHERE name = $3 AND email = $4";
  const queryParams = [newName, newEmail, username, email];

  try {
    const res = await pool.query(queryText, queryParams);
    if (res.rowCount === 0) {
      throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

///
exports.findUserByResetToken = async function (resetToken) {
  const queryText = "SELECT * FROM users WHERE password_reset_token = $1";
  const queryParams = [resetToken];
  console.log(resetToken);
  try {
    const res = await pool.query(queryText, queryParams);
    if (res.rowCount === 0) {
      throw new Error("User not found");
    }
    return res.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.updateUserPasswordbyEmail = async function (email, hashedPassword) {
  const queryText = "UPDATE users SET password = $1 WHERE email = $2";
  const queryParams = [hashedPassword, email];

  try {
    const res = await pool.query(queryText, queryParams);
    if (res.rowCount === 0) {
      throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.setUserResetToken = async function (email, resetToken, resetExpires) {
  const queryText =
    "UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE email = $3";
  const queryParams = [resetToken, resetExpires, email];

  try {
    const res = await pool.query(queryText, queryParams);
    if (res.rowCount === 0) {
      throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.clearUserResetToken = async function (email) {
  const queryText =
    "UPDATE users SET password_reset_token = NULL, password_reset_expires = NULL WHERE email = $1";
  const queryParams = [email];

  try {
    const res = await pool.query(queryText, queryParams);
    if (res.rowCount === 0) {
      throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
