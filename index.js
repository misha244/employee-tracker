const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');

const connection = = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'secret',
  database : 'company_db'
});

const init = async () => {
  await
}

connection.connect()
init();