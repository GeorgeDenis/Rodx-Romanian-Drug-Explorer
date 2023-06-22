DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS confiscari;
DROP TABLE IF EXISTS infractiuni;
DROP TABLE IF EXISTS urgente;
DROP TABLE IF EXISTS campaigns;
DROP TABLE IF EXISTS confiscari_filtru;
DROP TABLE IF EXISTS infractiuni_filtru;
DROP TABLE IF EXISTS urgente_filtru;


CREATE TABLE users (
                       user_id SERIAL PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       password_reset_token VARCHAR(255) NOT NULL,
                       password_reset_expires TIMESTAMP
);

CREATE TABLE confiscari (
    drog VARCHAR(255),
    grame DECIMAL,
    comprimate INT,
    doze INT,
    mililitri DECIMAL,
    nr_capturi INT,
    an INT
);

CREATE TABLE infractiuni (
    categorie varchar(255),
    valoare int,
    filtru varchar(255),
    subfiltru varchar(255),
    an int
);

CREATE TABLE urgente (
    id SERIAL PRIMARY KEY,
    categorie VARCHAR(255),
    canabis INT,
    stimulanti INT,
    opioide INT,
    nsp INT,
    filtru VARCHAR(255),
    an INT
);

CREATE TABLE campaigns (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255),
    title VARCHAR(255) UNIQUE,
    article VARCHAR(3000)
);
CREATE TABLE confiscari_filtru (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    categorie_select VARCHAR(255),
    confiscari_subcategorie VARCHAR(255),
    drog VARCHAR(255),
    startYearConfiscari INT,
    endYearConfiscari INT,
    reprezentare VARCHAR(255)
);
CREATE TABLE infractiuni_filtru (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    categorie_select VARCHAR(255),
    infractiuni_categorie VARCHAR(255),
    startYearInfractiuni INT,
    endYearInfractiuni INT,
    reprezentare VARCHAR(255),
    incadrare_filtru_infractiuni VARCHAR(255),
    cercetari_filtru_infractiuni VARCHAR(255),    
    gen_filtru_infractiuni VARCHAR(255),
    grupari_filtru_infractiuni VARCHAR(255),
    pedepse_filtru_infractiuni VARCHAR(255),
    lege_filtru_infractiuni VARCHAR(255),
    varsta_filtru_infractiuni VARCHAR(255)
    
);
CREATE TABLE urgente_filtru (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    categorie_select VARCHAR(255),
    urgente_an VARCHAR(255),
    urgente_drog VARCHAR(255),
    startYear INT,
    endYear INT,
    reprezentare VARCHAR(255),
    urgente_filtru VARCHAR(255),
    varsta_filtru VARCHAR(255),    
    administrare_filtru VARCHAR(255),
    consum_filtru VARCHAR(255),
    gen_filtru VARCHAR(255),
    diagnostic_filtru VARCHAR(255)
);