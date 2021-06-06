const inquirer = require("inquirer");
const mysql = require("mysql");
const DB = require("./src/db/DB");
const db = new DB("company_db");

const init = async () => {
  await db.start();

  const initialQ = {
    name: "firstQ",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Roles",
      "View All Departments",
      "Add an Employee",
      "Update Employee Role",
      "Add a Role",
      "Add a Department",
      "Exit",
    ],
  };

  const { firstQ } = await inquirer.prompt(initialQ);

  if (firstQ === "View All Employees") {
    await viewAllEmployees();
  } else if (firstQ === "View All Roles") {
    await viewAllRoles();
  } else if (firstQ === "View All Departments") {
    await viewAllDepartments();
  } else if (firstQ === "Add an Employee") {
    await addEmployee();
  } else if (firstQ === "Update Employee Role") {
    await updateEmployeeRole();
  } else if (firstQ === "Add a Role") {
    await addRole();
  } else if (firstQ === "Add a Department") {
    await addDepartment();
  } else {
    if (firstQ === "Exit") {
      await db.end();
    }
  }
};

// initial functions
const viewAllEmployees = async () => {
  let query = `SELECT first_name, last_name, title, salary, name FROM employees LEFT JOIN roles ON employees.role_id=roles.id LEFT JOIN departments ON roles.department_id=departments.id;`;
  let data = await db.query(query);
  console.table(data);
};

const viewAllRoles = async () => {
  let query = `SELECT * FROM roles`;
  let data = await db.query(query);
  console.table(data);
};

const viewAllDepartments = async () => {
  let query = `SELECT * FROM departments`;
  let data = await db.query(query);
  console.table(data);
};

const addEmployee = async () => {
  const newEmployee = await inquirer.prompt([
    {
      type: "input",
      name: "fName",
      message: "Please enter the new employee's first name: ",
    },
    {
      type: "input",
      name: "lName",
      message: "Please enter the new employee's last name: ",
    },
    {
      type: "input",
      name: "id",
      message: "Please enter the new employee's Id number: ",
    },
  ]);

  const result = await db.parameterisedQuery(`INSERT INTO employees SET ?`, {
    first_name: newEmployee.fName,
    last_name: newEmployee.lName,
    role_id: newEmployee.id,
  });
  console.log(
    `${newEmployee.fName} ${newEmployee.lName} has successfully been added as an employee!`
  );
};

const updateEmployeeRole = async () => {
  const chooseEmployees = await db.query(
    `SELECT id, first_name, last_name FROM employees;`
  );
  const employeeName = chooseEmployees.map((employees) => {
    return `${employees.first_name} ${employees.last_name}`;
  });
  const chooseRoles = await db.query(`SELECT id, title FROM roles;`);
  const roleName = chooseRoles.map((roles) => {
    return roles.title;
  });
  const updateEmployeeQ = [
    {
      type: "list",
      name: "name",
      message: "Select the name of the employee whose role you want to change:",
      choices: employeeName,
    },
    {
      type: "list",
      name: "newRole",
      message: "Select the new title you want to assign to the employee:",
      choices: roleName,
    },
  ];

  const updateEmployeeA = await inquirer.prompt(updateEmployeeQ);
  const selectedEmployee = chooseEmployees.filter((employees) => {
    return (
      `${employees.first_name} ${employees.last_name}` ===
      updateEmployeeA.employeeName
    );
  });

  const selectedRole = chooseRoles.filter((roles) => {
    return roles.title === updateEmployeeA.roleName;
  });

  await db.parameterisedQuery("UPDATE roles SET title = ? WHERE id = ?;", [
    selectedEmployee.id,
    selectedRole.id,
  ]);
};

const addRole = async () => {
  let query = `SELECT * FROM employees`;
  let data = await db.query(query);
  console.table(data);
};

const addDepartment = async () => {
  let query = `SELECT * FROM employees`;
  let data = await db.query(query);
  console.table(data);
};

init();
