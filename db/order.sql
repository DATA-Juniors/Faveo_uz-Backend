-- Active: 1675333596952@@127.0.0.1@5432@users@public
Active: 1675333596952@@127.0.0.1@5432@users
CREATE TABLE Orders ( 
    id              SERIAL PRIMARY KEY,
    address         VARCHAR(100),
    phone           VARCHAR(100),
    name            VARCHAR(100),
    purchase_type   VARCHAR(50),
    created         DATE
);


CREATE TABLE Basket (
    id          SERIAL PRIMARY KEY,
    order_id    SERIAL,
    product_id  SERIAL,
    quantity    SERIAL
);






 
