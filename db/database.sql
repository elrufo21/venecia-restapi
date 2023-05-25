CREATE DATABASE veneciadb;
USE companydb;

CREATE TABLE users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45),
    lastname VARCHAR(100),
    username VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    phone VARCHAR(20),
    PRIMARY KEY (id)    
);