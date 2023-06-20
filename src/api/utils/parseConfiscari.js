const XLSX = require("xlsx");
const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "1234",
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
      "INSERT INTO confiscari(drog, grame, comprimate, doze,mililitri, nr_capturi, an) VALUES($1, $2, $3, $4, $5, $6,$7)",
      [
        row.Drog,
        row.Grame,
        row.Comprimate,
        row.Doze,
        row.Mililitri,
        row.Capturi,
        year,
      ]
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
