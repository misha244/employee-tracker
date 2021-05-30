USE company_db;

/* Departments */

INSERT INTO departments (name) VALUES ('Sales');
INSERT INTO departments (name) VALUES ('Finance');
INSERT INTO departments (name) VALUES ('Human Resources');

/* Roles */

INSERT INTO roles (title, salary, department_id) VALUES ('Sales Representative', '25000.00', '1');
INSERT INTO roles (title, salary, department_id) VALUES ('Sales Manager', '35000.00', '1');

INSERT INTO roles (title, salary, department_id) VALUES ('Payroll Advisor', '30000.00', '2');

INSERT INTO roles (title, salary, department_id) VALUES ('Regional Manager', '65000.00', '3');
INSERT INTO roles (title, salary, department_id) VALUES ('Senior HR Advisor', '55000.00', '3');
INSERT INTO roles (title, salary, department_id) VALUES ('HR Advisor', '45000.00', '3');
INSERT INTO roles (title, salary, department_id) VALUES ('Associate HR Advisor', '23000.00', '3');

/* Employees */

INSERT INTO employees (first_name, last_name, role_id) VALUES ('John', 'Smith', '7');
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Alice', 'Walker', '7');
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Harry', 'Potter', '6');
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Captain', 'America', '5');
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Michael', 'Scott', '4');
INSERT INTO employees (first_name, last_name, role_id) VALUES ('David', 'Brent', '2');
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Linda', 'Green', '2');
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Ryan', 'Gosling', '3');
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Tony', 'Stark', '1');