const XLSX = require("xlsx");
const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "Monster02@",
  database: "TW",
});

client.connect();

let fileName = process.argv[2];
let year = fileName.split("-")[1].split(".")[0];

let workbook = XLSX.readFile(fileName);
let sheet_name_list = workbook.SheetNames;

sheet_name_list.forEach((y) => {
  let worksheet = workbook.Sheets[y];
  let data = XLSX.utils.sheet_to_json(worksheet);

  let promises = data.map((row) => {
    return client.query(
      "INSERT INTO infractiuni(categorie, valoare, filtru, subfiltru,an) VALUES($1, $2, $3, $4, $5)",
      [row.Categorie, row.Valoare, row.Filtru, row.Subfiltru, year]
    );
  });

  Promise.all(promises)
    .then(() => {
      client.end();
    })
    .catch((err) => {
      console.log(err.stack);
      client.end();
    });
});
