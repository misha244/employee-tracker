USE company_db;

-- GET all department with role information
SELECT name, title, salary FROM department LEFT JOIN role ON department.id=role.department_id;

-- GET all role with department information
SELECT title as "role", name as "department", salary as "salary" FROM department;

-- Get all department
SELECT * FROM department;

-- Get all role
SELECT id, title FROM role;

-- Get all employee
SELECT id, first_name, last_name FROM employee;

-- Get all employee with role and department information
SELECT first_name, last_name, title, salary, name FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id;

-- Get all employee with role and department information and manager
SELECT employee_role.first_name, employee_role.last_name, title, salary, name, employee_manager.first_name, employee_manager.last_name
FROM employee employee_role 
LEFT JOIN role 
ON employee_role.role_id=role.id 
LEFT JOIN department
ON role.department_id=department.id
LEFT JOIN employee employee_manager
ON employee_role.manager_id=employee_manager.id;