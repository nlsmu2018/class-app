DROP DATABASE IF EXISTS class_app;
CREATE DATABASE class_app;
USE class_app;

CREATE TABLE students (id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, registeredIds VARCHAR(100), droppedIds VARCHAR(100),PRIMARY KEY(id));


