const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const util = require("util");

let db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "company_db",
});

db.query = util.promisify(db.query);

db.connect(function (err) {
  if (err) throw err;
  init();
});

console.table("\n------------ EMPLOYEE TRACKER ------------\n");

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

const viewAllEmployees = async () => {
  console.log("Employee View");
  try {
    let query = "SELECT * FROM employee";
    db.query(query, function (err, res) {
      if (err) throw err;
      let employeeArray = [];
      res.forEach((employee) => employeeArray.push(employee));
      console.table(employeeArray);
      init();
    });
  } catch (err) {
    console.log(err);
    init();
  }
};

const viewAllDepartments = async () => {
  console.log("Department View");
  try {
    let query = "SELECT * FROM department";
    db.query(query, function (err, res) {
      if (err) throw err;
      let departmentArray = [];
      res.forEach((department) => departmentArray.push(department));
      console.table(departmentArray);
      init();
    });
  } catch (err) {
    console.log(err);
    init();
  }
};

const viewAllRoles = async () => {
  console.log("Role View");
  try {
    let query = "SELECT * FROM role";
    db.query(query, function (err, res) {
      if (err) throw err;
      let roleArray = [];
      res.forEach((role) => roleArray.push(role));
      console.table(roleArray);
      init();
    });
  } catch (err) {
    console.log(err);
    init();
  }
};

const addEmployee = async () => {
  try {
    console.log("Employee Add");

    let roles = await db.query("SELECT * FROM role");

    let managers = await db.query("SELECT * FROM employee");

    let answers = await inquirer.prompt([
      {
        name: "fName",
        type: "input",
        message: "Please enter the new employee's first name:",
      },
      {
        name: "lName",
        type: "input",
        message: "Please enter the new employee's last name:",
      },
      {
        name: "employeeRoleId",
        type: "list",
        choices: roles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        }),
        message: "Please enter the new employee's role Id number:",
      },
      {
        name: "employeeManagerId",
        type: "list",
        choices: managers.map((manager) => {
          return {
            name: manager.first_name + " " + manager.last_name,
            value: manager.id,
          };
        }),
        message: "Please select the new employee's manager",
      },
    ]);

    let result = await db.query("INSERT INTO employee SET ?", {
      first_name: answers.fName,
      last_name: answers.lName,
      role_id: answers.employeeRoleId,
      manager_id: answers.employeeManagerId,
    });

    console.log(
      `${answers.fName} ${answers.lName} has successfully been added as an employee!\n`
    );
    init();
  } catch (err) {
    console.log(err);
    init();
  }
};

const addDepartment = async () => {
  try {
    console.log("Department Add");

    let answers = await inquirer.prompt([
      {
        name: "deptName",
        type: "input",
        message: "What is the name of your new department?",
      },
    ]);

    let result = await db.query("INSERT INTO department SET ?", {
      name: answers.deptName,
    });

    console.log(`${answers.deptName} added successfully to departments.\n`);
    init();
  } catch (err) {
    console.log(err);
    init();
  }
};

const addRole = async () => {
  try {
    console.log("Role Add");

    let departments = await db.query("SELECT * FROM department");

    let answers = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "Enter the title of the role you want to add:",
      },
      {
        name: "salary",
        type: "input",
        message: "What is your new role's salary?",
      },
      {
        name: "departmentId",
        type: "list",
        choices: departments.map((departmentId) => {
          return {
            name: departmentId.department_name,
            value: departmentId.id,
          };
        }),
        message: "What department ID is this role associated with?",
      },
    ]);

    let chosenDepartment;
    for (i = 0; i < departments.length; i++) {
      if (departments[i].department_id === answers.choice) {
        chosenDepartment = departments[i];
      }
    }

    let result = await db.query("INSERT INTO role SET ?", {
      title: answers.title,
      salary: answers.salary,
      department_id: answers.departmentId,
    });

    console.log(`${answers.title} role has been added successfully.\n`);
    init();
  } catch (err) {
    console.log(err);
    init();
  }
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
