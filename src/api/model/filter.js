const pool = require("../database/connection");

exports.addConfiscariFilter = async (filterData, email) => {
  const { confiscari_subcategorie, confiscari_an, tip, reprezentare } =
    filterData;

  // Verificați dacă filtrul există deja
  const checkQueryText = `
    SELECT * FROM filtru_confiscari
    WHERE confiscari_subcategorie = $1
    AND confiscari_an = $2
    AND tip = $3
    AND reprezentare = $4
    AND email = $5
  `;
  const checkValues = [
    confiscari_subcategorie,
    confiscari_an,
    tip,
    reprezentare,
    email,
  ];

  try {
    const checkResult = await pool.query(checkQueryText, checkValues);

    if (checkResult.rows.length > 0) {
      // Filtrul există deja în baza de date
      return null;
    }

    // Continuați cu inserarea filtrului
    const insertQueryText =
      "INSERT INTO filtru_confiscari (confiscari_subcategorie, confiscari_an, tip, reprezentare, email) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const insertValues = [
      confiscari_subcategorie,
      confiscari_an,
      tip,
      reprezentare,
      email,
    ];

    const result = await pool.query(insertQueryText, insertValues);
    return result.rows[0]; // returnează utilizatorul creat
  } catch (err) {
    console.error(err);
    throw err;
  }
};
