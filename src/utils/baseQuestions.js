const baseQuestions = [
  {
    type: "list",
    message: "What do you want to do?",
    name: "baseChoices",
    choices: [
      "Create Employee",
      "View Employee",
      "Update Employee",
      "Remove Employee",
      "Exit",
    ],
  },
];
module.exports = baseQuestions;
