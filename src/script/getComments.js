import inquirer from 'inquirer';

const Crowdrz = require('../../../crowdrz-js/index');

const ora = require('ora');

async function promptMissingOptions() {
  const questions = [];

  questions.push({
    type: 'input',
    name: 'postId',
    message: 'Post ID'
  });

  questions.push({
    type: 'list',
    name: 'output',
    message: 'Output name',
    choices: ['.csv', '.txt', '.json'],
    default: ['.csv']
  });

  questions.push({
    type: 'confirm',
    name: 'metadata',
    message: 'Load metadata ?',
  });

  const answers = await inquirer.prompt(questions);
  return answers;
}

module.exports = async function() {
  await promptMissingOptions();
  let crowdrz = new Crowdrz('facebook', 'EAAGnFkxIcgQBALyw2vjF9ZBQL13Vmgs6eVEyqIRuZBwmV7EU31Ct5tAH8ZBJjGXkyVtbC1xma5e76tkNTUa48gfmEk8gsRsdCZAMckWDKh12pEJZAACk0jpnsLQrjpjmqmt8ovnPvskcJdUfFikMQ16qzkj6xxImQlNZAFDkCSaZCGsNEn79FxpEolBXm3ZCIC42iRkmZCi41ugZDZD');
  let comments = crowdrz.applyProcess('getComments', '1537872846355561');
}


 

 
