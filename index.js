const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

var userInput = await inquirer.prompt([
    {
        type: "input",
        message: "GitHub username?",
        name: "username",
    },
    {
        type: "input",
        message: "How would you describe this project?",
        name: "projectdescription",
    },
    {
        type: "input",
        message: "What were the steps taken to install the project?",
        name: "install",
    },
    {
        type: "input",
        message: "What command do you run to start the ReadMe Generator?",
        name: "command",
    },
    {
        type: "input",
        message: "What license did you use?",
        name: "license",
    },
    {
        type: "input",
        message: "What would be a good example of use?",
        name: "use",
    },
    {
        type: "input",
        message: "Press Enter to generate ReadMe",
        name: "start",
    },
]);

console.log('starting');

