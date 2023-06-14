const pool = require("../database/connection");

exports.addInfractiuniFilter = async (filterData, email) => {
  const { categorie, an, tip, reprezentare } = filterData;

  const checkQueryText = `
    SELECT * FROM filtru_confiscari
    WHERE confiscari_subcategorie = $1
    AND confiscari_an = $2
    AND tip = $3
    AND reprezentare = $4
    AND email = $5
  `;
  const checkValues = [categorie, an, tip, reprezentare, email];

  try {
    const checkResult = await pool.query(checkQueryText, checkValues);

    if (checkResult.rows.length > 0) {
      return null;
    }

    // Continuați cu inserarea filtrului
    const insertQueryText =
      "INSERT INTO filtru_confiscari (confiscari_subcategorie, confiscari_an, tip, reprezentare, email) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const insertValues = [categorie, an, tip, reprezentare, email];

    const result = await pool.query(insertQueryText, insertValues);
    return result.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
