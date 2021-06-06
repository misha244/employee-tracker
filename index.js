const inquirer = require("inquirer");
const DB = require("./src/db/DB");
const db = new DB("company_db");

const initialQ = async () => {
  const firstQuestion = [
    {
      type: "list",
      name: "firstQ",
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
      message: "Please, select what would you like to do:",
    },
  ];

  const { firstQ } = await inquirer.prompt(firstQuestion);

  if (firstQ === "View all departments") {
    viewAllDepartments();
  } else if (firstQ === "View all roles") {
    viewAllRoles();
  } else if (firstQ === "View all employees") {
    viewAllEmployees();
  } else if (firstQ === "Add new department") {
    await addDepartment();
  } else if (firstQ === "Update Employee Role") {
    await updateEmployeeRole();
  } else if (firstQ === "Add new role") {
    await addRole();
  } else if (firstQ === "Add new employee") {
    await addEmployee();
  } else if (firstQ === "Exit") {
    await db.end();
  }
};
// initial functions
const viewAllEmployees = async () => {
  const employeesQuery = await db.query("SELECT * FROM employees");
  console.table(employeesQuery);
};

const viewAllRoles = async () => {
  const query = "SELECT * FROM roles";
  const data = await db.query(query);
  console.table(data);
};

const viewAllDepartments = async () => {
  const query = "SELECT * FROM departments";
  const data = await db.query(query);
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
  console.log(result);
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

  await db.parameterisedQuery(
    "UPDATE employees SET role_id = ? WHERE id = ?;",
    [selectedEmployee.id, selectedRole.id]
  );
};
const addRole = async () => {
  const query = `SELECT * FROM employees`;
  const data = await db.query(query);
  console.table(data);
};

const addDepartment = async () => {
  const query = `SELECT * FROM employees`;
  const data = await db.query(query);
  console.table(data);
};
const init = async () => {
  await db.start();
  await initialQ();
};
init();
