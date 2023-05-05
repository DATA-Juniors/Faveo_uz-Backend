-- Active: 1675333596952@@127.0.0.1@5432@faveo
CREATE TABLE Users (
    id          SERIAL PRIMARY KEY,
    username    VARCHAR(100),
    email       VARCHAR(100),
    password    VARCHAR(100),
    name        VARCHAR(100),
    surname     VARCHAR(100),
    birthday    VARCHAR(100),
    phone       VARCHAR(100),
    token       VARCHAR(256),
    role        VARCHAR(56) DEFAULT('user')
);


create table verification (
    id          TEXT UNIQUE NOT NULL,
    code        VARCHAR(100),
    email       VARCHAR(100),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Phones (
    id         SERIAL UNIQUE PRIMARY KEY,
    phone      VARCHAR(100)
);

CREATE TABLE Info (
    id                SERIAL UNIQUE PRIMARY KEY,
    name              VARCHAR(100),
    location_geo      VARCHAR(100),
    location_address  VARCHAR(100)
);







