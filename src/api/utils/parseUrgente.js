const XLSX = require('xlsx');
const { Client } = require('pg');

// Conectarea la baza de date
const client = new Client({
    host: 'localhost', // Modifică conform configurării tale
    user: 'postgres',      // Modifică conform configurării tale
    password: '1234',  // Modifică conform configurării tale
    database: 'TW'  // Modifică conform configurării tale
});

client.connect();

let fileName = process.argv[2]; // Primul argument suplimentar al liniei de comandă
let year = fileName.split('-')[1].split('.')[0]; // Extrage anul din numele fișierului

let workbook = XLSX.readFile(fileName);
let sheet_name_list = workbook.SheetNames;

// Deschiderea și citirea fișierului xlsx
sheet_name_list.forEach((y) => {
    let worksheet = workbook.Sheets[y];
    let data = XLSX.utils.sheet_to_json(worksheet);

    let promises = data.map((row) => {
        return client.query(
            'INSERT INTO urgente(categorie, canabis, stimulanti, opioide, nsp, filtru, an) VALUES($1, $2, $3, $4, $5, $6, $7)', 
            [row.Categorie, row.Canabis, row.Stimulanți, row.Opiacee, row.NSP, row.Filtru, year]
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
