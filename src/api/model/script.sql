DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS confiscari;
DROP TABLE IF EXISTS infractiuni;
DROP TABLE IF EXISTS urgente;
DROP TABLE IF EXISTS campaigns;

CREATE TABLE users (
                       user_id SERIAL PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL,
                       password VARCHAR(255) NOT NULL
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