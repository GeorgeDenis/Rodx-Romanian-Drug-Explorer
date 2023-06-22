const pool = require("../database/connection");
const { getUserId } = require("../model/user");

exports.addConfiscariFilter = async (filterData, email) => {
  const {
    categorie_select,
    confiscari_subcategorie,
    startYearConfiscari,
    reprezentare,
    endYearConfiscari,
    drog,
  } = filterData;
  const user_id = await getUserId(email);

  const checkQueryText = `
    SELECT * FROM confiscari_filtru
    WHERE categorie_select = $1 AND
    confiscari_subcategorie = $2
    AND drog = $3
    AND startYearConfiscari = $4
    AND endYearConfiscari = $5
    AND reprezentare = $6
    AND user_id = $7
  `;
  const checkValues = [
    categorie_select,
    confiscari_subcategorie,
    drog,
    startYearConfiscari,
    endYearConfiscari,
    reprezentare,
    user_id,
  ];

  try {
    const checkResult = await pool.query(checkQueryText, checkValues);

    if (checkResult.rows.length > 0) {
      return null;
    }

    const insertQueryText =
      "INSERT INTO confiscari_filtru (categorie_select,confiscari_subcategorie, drog, startYearConfiscari, endYearConfiscari, reprezentare,user_id) VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING *";
    const insertValues = [
      categorie_select,
      confiscari_subcategorie,
      drog,
      startYearConfiscari,
      endYearConfiscari,
      reprezentare,
      user_id,
    ];
    const result = await pool.query(insertQueryText, insertValues);
    return result.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
exports.deleteConfiscariFilter = async (filterId, email) => {
  const user_id = await getUserId(email);
  try {
    const queryText =
      "DELETE FROM confiscari_filtru WHERE user_id=$1 AND id=$2";
    const result = await pool.query(queryText, [user_id, filterId]);

    if (result.rowCount === 0) {
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    throw new Error("Database query failed");
  }
};
exports.deleteUrgenteFilter = async (filterId, email) => {
  const user_id = await getUserId(email);
  try {
    const queryText = "DELETE FROM urgente_filtru WHERE user_id=$1 AND id=$2";
    const result = await pool.query(queryText, [user_id, filterId]);

    if (result.rowCount === 0) {
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    throw new Error("Database query failed");
  }
};
exports.deleteUrgenteFilter = async (filterId, email) => {
  const user_id = await getUserId(email);
  try {
    const queryText = "DELETE FROM urgente_filtru WHERE user_id=$1 AND id=$2";
    const result = await pool.query(queryText, [user_id, filterId]);

    if (result.rowCount === 0) {
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    throw new Error("Database query failed");
  }
};
exports.deleteInfractiuniFilter = async (filterId, email) => {
  const user_id = await getUserId(email);
  try {
    const queryText =
      "DELETE FROM infractiuni_filtru WHERE user_id=$1 AND id=$2";
    const result = await pool.query(queryText, [user_id, filterId]);

    if (result.rowCount === 0) {
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    throw new Error("Database query failed");
  }
};
exports.addUrgenteFiltru = async (filterData, email) => {
  const {
    categorie_select,
    urgente_an,
    urgente_drog,
    urgente_filtru,
    reprezentare,
    startYear,
    endYear,
    varsta_filtru,
    administrare_filtru,
    consum_filtru,
    gen_filtru,
    diagnostic_filtru,
  } = filterData;
  const user_id = await getUserId(email);
  const checkQueryText = `
  SELECT * FROM urgente_filtru
  WHERE categorie_select IS NOT DISTINCT FROM $1 AND
  urgente_an IS NOT DISTINCT FROM $2 AND
  urgente_drog IS NOT DISTINCT FROM $3 AND
  urgente_filtru IS NOT DISTINCT FROM $4 AND
  reprezentare IS NOT DISTINCT FROM $5 AND
  startYear IS NOT DISTINCT FROM $6 AND
  endYear IS NOT DISTINCT FROM $7 AND
  varsta_filtru IS NOT DISTINCT FROM $8 AND
  administrare_filtru IS NOT DISTINCT FROM $9 AND
  consum_filtru IS NOT DISTINCT FROM $10 AND
  gen_filtru IS NOT DISTINCT FROM $11 AND
  diagnostic_filtru IS NOT DISTINCT FROM $12 AND
  user_id IS NOT DISTINCT FROM $13
`;
  const checkValues = [
    categorie_select,
    urgente_an,
    urgente_drog,
    urgente_filtru,
    reprezentare,
    startYear,
    endYear,
    varsta_filtru,
    administrare_filtru,
    consum_filtru,
    gen_filtru,
    diagnostic_filtru,
    user_id,
  ];

  try {
    const checkResult = await pool.query(checkQueryText, checkValues);

    if (checkResult.rows.length > 0) {
      return null;
    }

    const insertQueryText =
      "INSERT INTO urgente_filtru (categorie_select,urgente_an,urgente_drog,urgente_filtru,reprezentare,startYear,endYear,varsta_filtru,administrare_filtru,consum_filtru,gen_filtru,diagnostic_filtru,user_id) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *";
    const insertValues = [
      categorie_select,
      urgente_an,
      urgente_drog,
      urgente_filtru,
      reprezentare,
      startYear,
      endYear,
      varsta_filtru,
      administrare_filtru,
      consum_filtru,
      gen_filtru,
      diagnostic_filtru,
      user_id,
    ];
    const result = await pool.query(insertQueryText, insertValues);
    return result.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.addInfractiuniFilter = async (filterData, email) => {
  const {
    categorie_select,
    infractiuni_categorie,
    startYearInfractiuni,
    reprezentare,
    endYearInfractiuni,
    incadrare_filtru_infractiuni,
    cercetari_filtru_infractiuni,
    gen_filtru_infractiuni,
    grupari_filtru_infractiuni,
    pedepse_filtru_infractiuni,
    lege_filtru_infractiuni,
    varsta_filtru_infractiuni,
  } = filterData;
  const user_id = await getUserId(email);
  const checkQueryText = `
    SELECT * FROM infractiuni_filtru
    WHERE categorie_select IS NOT DISTINCT FROM $1 AND
    infractiuni_categorie IS NOT DISTINCT FROM $2 AND
    startYearInfractiuni IS NOT DISTINCT FROM $3 AND
    reprezentare IS NOT DISTINCT FROM $4 AND
    endYearInfractiuni IS NOT DISTINCT FROM $5 AND
    incadrare_filtru_infractiuni IS NOT DISTINCT FROM $6 AND
    cercetari_filtru_infractiuni IS NOT DISTINCT FROM $7 AND
    gen_filtru_infractiuni IS NOT DISTINCT FROM $8 AND
    grupari_filtru_infractiuni IS NOT DISTINCT FROM $9 AND
    pedepse_filtru_infractiuni IS NOT DISTINCT FROM $10 AND
    lege_filtru_infractiuni IS NOT DISTINCT FROM $11 AND
    varsta_filtru_infractiuni IS NOT DISTINCT FROM $12 AND
    user_id IS NOT DISTINCT FROM $13
  `;

  const checkValues = [
    categorie_select,
    infractiuni_categorie,
    startYearInfractiuni,
    reprezentare,
    endYearInfractiuni,
    incadrare_filtru_infractiuni,
    cercetari_filtru_infractiuni,
    gen_filtru_infractiuni,
    grupari_filtru_infractiuni,
    pedepse_filtru_infractiuni,
    lege_filtru_infractiuni,
    varsta_filtru_infractiuni,
    user_id,
  ];

  try {
    const checkResult = await pool.query(checkQueryText, checkValues);

    if (checkResult.rows.length > 0) {
      return null;
    }

    const insertQueryText =
      "INSERT INTO infractiuni_filtru (categorie_select,infractiuni_categorie, startYearInfractiuni, reprezentare, endYearInfractiuni,incadrare_filtru_infractiuni,cercetari_filtru_infractiuni,gen_filtru_infractiuni,grupari_filtru_infractiuni,pedepse_filtru_infractiuni,lege_filtru_infractiuni,varsta_filtru_infractiuni,user_id) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *";
    const insertValues = [
      categorie_select,
      infractiuni_categorie,
      startYearInfractiuni,
      reprezentare,
      endYearInfractiuni,
      incadrare_filtru_infractiuni,
      cercetari_filtru_infractiuni,
      gen_filtru_infractiuni,
      grupari_filtru_infractiuni,
      pedepse_filtru_infractiuni,
      lege_filtru_infractiuni,
      varsta_filtru_infractiuni,
      user_id,
    ];
    const result = await pool.query(insertQueryText, insertValues);
    return result.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.getAllConfiscariFilter = async (email) => {
  const user_id = await getUserId(email);

  const queryText = `
    SELECT id,categorie_select,confiscari_subcategorie,drog,startYearConfiscari,endYearConfiscari,reprezentare FROM confiscari_filtru
    WHERE user_id = $1
  `;
  const values = [user_id];

  try {
    const result = await pool.query(queryText, values);
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
exports.getAllUrgenteFilter = async (email) => {
  const user_id = await getUserId(email);
  const queryText = `
    SELECT id,categorie_select,urgente_an,urgente_drog,urgente_filtru,reprezentare,startYear,endYear,varsta_filtru,administrare_filtru,consum_filtru,gen_filtru,diagnostic_filtru,user_id FROM urgente_filtru WHERE user_id = $1
  `;
  const values = [user_id];

  try {
    const result = await pool.query(queryText, values);
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
exports.getAllInfractiuniFilter = async (email) => {
  const user_id = await getUserId(email);
  const queryText = `
  SELECT  id,categorie_select,
  infractiuni_categorie,
  startYearInfractiuni,
  reprezentare,
  endYearInfractiuni,
  incadrare_filtru_infractiuni,
  cercetari_filtru_infractiuni,
  gen_filtru_infractiuni,
  grupari_filtru_infractiuni,
  pedepse_filtru_infractiuni,
  lege_filtru_infractiuni,
  varsta_filtru_infractiuni FROM infractiuni_filtru WHERE 
  user_id=$1
`;
  const values = [user_id];

  try {
    const result = await pool.query(queryText, values);
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.getUrgenteByFilter = async (urgenteData) => {
  const { urgente_an, urgente_drog, urgente_filtru } = urgenteData;
  const allowedDrogs = ["canabis", "stimulanti", "opioide", "nsp"];

  if (!allowedDrogs.includes(urgente_drog)) {
    throw new Error(`Invalid drug: ${urgente_drog}`);
  }
  const queryText = {
    text: `SELECT categorie, ${urgente_drog} FROM urgente WHERE an=$1 AND filtru=$2`,
    values: [urgente_an, urgente_filtru],
  };

  const result = await pool.query(queryText);
  const urgente = result.rows.map((row) => {
    return {
      label: row.categorie,
      drog: urgente_drog,
      cantitate: row[urgente_drog],
      filtru: urgente_filtru,
      an: urgente_an,
    };
  });
  return urgente;
};
exports.getUrgenteIntervalBd = async (urgenteData) => {
  const {
    startYear,
    urgente_drog,
    gen_filtru,
    consum_filtru,
    diagnostic_filtru,
    varsta_filtru,
    administrare_filtru,
    endYear,
  } = urgenteData;
  const allowedDrogs = ["canabis", "stimulanti", "opioide", "nsp"];

  if (!allowedDrogs.includes(urgente_drog)) {
    throw new Error(`Invalid drug: ${urgente_drog}`);
  }
  let filtru =
    gen_filtru ||
    consum_filtru ||
    diagnostic_filtru ||
    varsta_filtru ||
    administrare_filtru;

  const queryText = {
    text: `SELECT an, filtru, ${urgente_drog} FROM urgente WHERE an BETWEEN $1 AND $2 AND categorie=$3`,
    values: [startYear, endYear, filtru],
  };

  const result = await pool.query(queryText);
  const urgente = result.rows.map((row) => {
    return {
      label: row["an"],
      cantitate: row[urgente_drog],
      categorie: filtru,
      drog: urgente_drog,
      filtru: row["filtru"],
    };
  });
  return urgente;
};

exports.getConfiscariIntervalBd = async (confiscariDate) => {
  const {
    confiscari_subcategorie,
    drog,
    endYearConfiscari,
    startYearConfiscari,
  } = confiscariDate;
  const allowed = ["comprimate", "grame", "doze", "mililitri", "nr_capturi"];

  if (!allowed.includes(confiscari_subcategorie)) {
    throw new Error(`Invalid drug: ${confiscari_subcategorie}`);
  }
  const queryText = {
    text: `SELECT an, ${confiscari_subcategorie} FROM confiscari WHERE an BETWEEN $1 AND $2 AND drog=$3`,
    values: [startYearConfiscari, endYearConfiscari, drog],
  };

  const result = await pool.query(queryText);
  const confiscari = result.rows.map((row) => {
    return {
      label: row["an"],
      cantitate: Math.floor(row[confiscari_subcategorie]),
      filtru: confiscari_subcategorie,
      drog: drog,
    };
  });
  return confiscari;
};
exports.getInfractiuniIntervalBd = async (infractiuniDate) => {
  const {
    infractiuni_categorie,
    endYearInfractiuni,
    startYearInfractiuni,
    incadrare_filtru_infractiuni,
    cercetari_filtru_infractiuni,
    gen_filtru_infractiuni,
    grupari_filtru_infractiuni,
    pedepse_filtru_infractiuni,
    varsta_filtru_infractiuni,
    lege_filtru_infractiuni,
  } = infractiuniDate;

  let filtru =
    incadrare_filtru_infractiuni ||
    cercetari_filtru_infractiuni ||
    gen_filtru_infractiuni ||
    grupari_filtru_infractiuni ||
    pedepse_filtru_infractiuni;
  let filtruSecond = null;
  filtruSecond = varsta_filtru_infractiuni || lege_filtru_infractiuni;
  if (filtruSecond) {
    const queryText = {
      text: `SELECT an, valoare FROM infractiuni WHERE an BETWEEN $1 AND $2 AND categorie=$3 AND filtru=$4 AND subfiltru=$5`,
      values: [
        startYearInfractiuni,
        endYearInfractiuni,
        infractiuni_categorie,
        filtru,
        filtruSecond,
      ],
    };
    const result = await pool.query(queryText);
    const confiscari = result.rows.map((row) => {
      return {
        label: row["an"],
        cantitate: Math.floor(row["valoare"]),
        categorie: infractiuni_categorie,
        filtru: filtru,
        subfiltru: filtruSecond,
      };
    });
    return confiscari;
  } else {
    const queryText = {
      text: `SELECT an, valoare FROM infractiuni WHERE an BETWEEN $1 AND $2 AND categorie=$3 AND filtru=$4`,
      values: [
        startYearInfractiuni,
        endYearInfractiuni,
        infractiuni_categorie,
        filtru,
      ],
    };
    const result = await pool.query(queryText);
    const confiscari = result.rows.map((row) => {
      return {
        label: row["an"],
        cantitate: Math.floor(row["valoare"]),
        categorie: infractiuni_categorie,
        filtru: filtru,
      };
    });
    return confiscari;
  }
};
