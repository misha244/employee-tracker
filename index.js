const consoleTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql");
const DB = require("./src/db/DB");
const db = new DB("company_db");

const init = async () => {
  try {
    let initialQ = await inquirer.prompt({
      name: "firstQ",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add an Employee",
        "Add a Department",
        "Add a Role",
        "Update Employee Role",
        "Exit",
      ],
    });
    switch (initialQ.firstQ) {
      case "View All Employees":
        viewAllEmployees();
        break;

      case "View All Departments":
        viewAllDepartments();
        break;

      case "View All Roles":
        viewAllRoles();
        break;

      case "Add an Employee":
        addEmployee();
        break;

      case "Add a Department":
        addDepartment();
        break;

      case "Add a Role":
        addRole();
        break;

      case "Update Employee Role":
        updateEmployeeRole();
        break;

      case "Exit":
        db.end();
        break;
    }
  } catch (err) {
    console.log(err);
    init();
  }
};

// initial functions
const viewAllEmployees = async () => {
  try {
    let query = `SELECT first_name, last_name, title, salary, name FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id;`;
    let data = await db.query(query);
    console.table(data);
    init();
  } catch (error) {
    console.log(error);
    init();
  }
};

const viewAllRoles = async () => {
  try {
    let query = `SELECT * FROM role`;
    let data = await db.query(query);
    console.table(data);
    init();
  } catch (error) {
    console.log(error);
    init();
  }
};

const viewAllDepartments = async () => {
  try {
    let query = `SELECT * FROM department`;
    let data = await db.query(query);
    console.table(data);
    init();
  } catch (error) {
    console.log(error);
    init();
  }
};

const addEmployee = async () => {
  try {
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
  } catch (error) {
    console.log(error);
    init();
  }

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
  try {
    let employees = await db.query("SELECT * FROM employee");

    let employeeSelection = await inquirer.prompt([
      {
        name: "name",
        type: "list",
        choices: employees.map((employeeName) => {
          return {
            name: employeeName.first_name + " " + employeeName.last_name,
            value: employeeName.id,
          };
        }),
        message:
          "Select the name of the employee whose role you want to change:",
      },
    ]);

    let roles = await db.query("SELECT * FROM role");

    let roleSelection = await inquirer.prompt([
      {
        type: "list",
        name: "role",
        choices: roles.map((roleName) => {
          return {
            name: roleName.title,
            value: roleName.id,
          };
        }),
        message: "Select the new title you want to assign to the employee:",
      },
    ]);

    let result = await db.query("UPDATE employee SET ? WHERE ?", [
      { role_id: roleSelection.role },
      { id: employeeSelection.name },
    ]);

    console.log(`The role was successfully updated.\n`);
    init();
  } catch (error) {
    console.log(error);
    init();
  }
};

const addRole = async () => {
  const departmentsOptions = await db.query("Select * FROM department");
  const departmentId = departmentsOptions.map((department) => {
    return department.id;
  });
  const addRoleQ = await inquirer.prompt([
    {
      type: "input",
      name: "roleTitle",
      message: "Enter the name of the title you want to add:",
    },
    {
      type: "list",
      name: "newRole",
      message: "Enter the salary of the title you want to add:",
    },
    {
      name: "department",
      type: "list",
      choices: departmentId,
      message: "What department ID is this role associated with?",
    },
  ]);

  let result = await connection.query("INSERT INTO role SET ?", {
    title: addRoleQ.title,
    salary: addRoleQ.salary,
    department_id: addRoleQ.departmentId,
  });
};

const addDepartment = async () => {
  let query = `SELECT * FROM employee`;
  let data = await db.query(query);
  console.table(data);
};

init();
