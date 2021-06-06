USE company_db;

/* Departments */

INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Finance');
INSERT INTO department (name) VALUES ('Human Resources');

/* Roles */

INSERT INTO role (title, salary, department_id) VALUES ('Sales Representative', '25000.00', '1');
INSERT INTO role (title, salary, department_id) VALUES ('Sales Manager', '35000.00', '1');

INSERT INTO role (title, salary, department_id) VALUES ('Payroll Advisor', '30000.00', '2');

INSERT INTO role (title, salary, department_id) VALUES ('Regional Manager', '65000.00', '3');
INSERT INTO role (title, salary, department_id) VALUES ('Senior HR Advisor', '55000.00', '3');
INSERT INTO role (title, salary, department_id) VALUES ('HR Advisor', '45000.00', '3');
INSERT INTO role (title, salary, department_id) VALUES ('Associate HR Advisor', '23000.00', '3');

/* Employees */

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Smith', '7', 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Alice', 'Walker', '7', 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Harry', 'Potter', '6', 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Captain', 'America', '5', 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Scott', '4', 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('David', 'Brent', '2', null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Linda', 'Green', '2', 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Ryan', 'Gosling', '3', 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Tony', 'Stark', '1', 2);