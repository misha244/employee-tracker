USE company_db;

-- GET all departments with role information
SELECT name, title, salary FROM departments LEFT JOIN roles ON departments.id=roles.department_id;

-- GET all roles with department information
SELECT title as "role", name as "department", salary as "salary" FROM departments;

-- Get all departments
SELECT * FROM departments;

-- Get all roles
SELECT id, title FROM roles;

-- Get all employees
SELECT id, first_name, last_name FROM employees;

-- Get all employees with role and department information
SELECT first_name, last_name, title, salary, name FROM employees LEFT JOIN roles ON employees.role_id=roles.id LEFT JOIN departments ON roles.department_id=departments.id;

-- Get all employees with role and department information and manager
SELECT employee_role.first_name, employee_role.last_name, title, salary, name, employee_manager.first_name, employee_manager.last_name
FROM employees employee_role 
LEFT JOIN roles 
ON employee_role.role_id=roles.id 
LEFT JOIN departments
ON roles.department_id=departments.id
LEFT JOIN employees employee_manager
ON employee_role.manager_id=employee_manager.id;