DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8 , 2 ),
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_departments FOREIGN KEY (department_id) 
        REFERENCES departments (id) ON DELETE CASCADE
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    CONSTRAINT fk_roles FOREIGN KEY (role_id) 
        REFERENCES roles (id) ON DELETE CASCADE,
    CONSTRAINT fk_employees FOREIGN KEY (manager_id) 
        REFERENCES employees (id) ON DELETE SET NULL
);
