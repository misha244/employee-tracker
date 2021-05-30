const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const Department = require("./src/db/Department");
const Role = require("./src/db/Role");
const Employee = require("./src/db/Employee");
const DB = require("./src/db/DB");

const init = async () => {
  const db = new DB();

  await db.start();

  const initialQ = await db.parameterisedQuery({
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
  });

  const { firstQ } = await inquirer.prompt(initialQ);

  if (firstQ === "View All Employees") {
    await viewAllEmployes();
  } else if (firstQ === "View All Roles") {
    await viewAllRoles();
  } else if (firstQ === "View All Departments") {
    await viewAllDepartments();
  } else if (firstQ === "Add an Employee") {
    await addEmployee();
  } else if (firstQ === "Update Employee Role") {
    await updateEmployee();
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

init();
