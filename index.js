const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function main() {
    const prompts = [
        {
            type: 'input',
            message: "GitHub username?",
            name: "username",
        },
        {
            type: 'input',
            message: "What is the name of your project",
            name: "projectName",
        },
        {
            type: 'input',
            message: "How would you describe this project?",
            name: "projectDescription",
        },
        {
            type: 'input',
            message: "What were the steps taken to install the project?",
            name: "install",
        },
        {
            type: 'input',
            message: "What command do you run to start the ReadMe Generator?",
            name: "command",
        },
        {
            type: 'input',
            message: "What license did you use? (Default: UNLICENSED)",
            name: "license",
        },
        {
            type: 'input',
            message: "What would be a good example of use?",
            name: "use",
        },
        {
            type: 'input',
            message: "Press Enter to generate ReadMe",
            name: "start",
        },
    ];
    const userResponse = await inquirer.prompt(prompts);

    const username = userResponse.username || 'travismh';

    const gitResponse = await axios
        .get(`https://api.github.com/users/${username}`)
        .catch((err) => console.log(err));
    console.dir(gitResponse.data)
    const gitData = gitResponse.data;

    const result = `
# ${userResponse.projectName || 'my project'} 
${userResponse.projectDescription || 'my description'}
* [Installation](#Installation)
* [Instructions](#Instructions)
* [License](#License)
* [Author](#Author)
    
## Installation
\`\`\`${userResponse.install || 'npm install'}\`\`\`

## Use
\`\`\`${userResponse.command || 'npm start'}\`\`\`

## Example
\`\`\`${userResponse.use || ' '}\`\`\`

## License
The license for this project ${userResponse.license || 'UNLICENSED'} 
    
## Author
**${gitData.login || 'Unknown'}**

${gitData.name || 'Name'}

${gitData.location || ''}

![ProfileImage](${gitData.avatar_url})

Email: ${gitData.email || 'Unprovided'}

GitHub: ${gitData.html_url || ''}
`;
    const writePath = path.join(__dirname, './', 'README_NEW.md');
    fs.writeFileSync(writePath, result);
    console.log(`Your readme.md has been generated and can be accessed at ${writePath}`);
}
main();