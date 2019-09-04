import inquirer from 'inquirer';

const Crowdrz = require('../../../crowdrz-js/dist/Crowdrz');

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
  let crowdrz = new Crowdrz('facebook', 'EAAGnFkxIcgQBADZBgioP6RQblT25BsZC57HbOp1LpvbnfMZBHgsQvZCuZAadjWQhBdQ5sHZAc6Jx07ZBm1ZC6siZA4NvRaxffoZAOOzKu2uy7SGZA7GJiXedqosdZBewjDJORhjUZC8wllUsvGfQxdyEtOldN5GZCXBBfsHB7T7dW4eqo0Uqo0I4DssK2oenOjyjHdDWsEbpZCSRvYaFgZDZD');
  let comments = crowdrz.applyProcess('getComments', '1537872846355561');
}


 

 
