import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import FB from 'fb';

const scriptList = {
  'Facebook': {
    'getComments': require('./script/getComments'),
  },
  'Instagram': {

  }
}

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--help': Boolean,
      '--run': Boolean,
      '--init': Boolean,
      '--status': Boolean,
      '-r': '--run',
      '-h': '--help',
      '-i': '--init',
      '-s': '--status'
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    runProcess: args['--run'] || false,
    runHelp: args['--help'] || false,
    runInit: args['--init'] || false,
    runStatus: args['--status'] || false
  };
}

async function promptSocialOptions(options) {
  const questions = [];
  
  questions.push({
    type: 'list',
    name: 'social',
    message: 'Please choose which social you use',
    choices: ['Facebook', 'Instagram'],
    default: 'Facebook',
  });

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    social: options.social || answers.social,
  };
}

async function promptRunProcessOptions(options) {
  const questions = [];
  if (options.social === 'Facebook') {
    questions.push({
      type: 'list',
      name: 'script',
      message: 'Please choose script to run',
      choices: ['getComments'],
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    script: options.script || answers.script,
  };
}

async function promptInitOptions(options) {
  const questions = [];
  questions.push({
    type: 'list',
    name: 'init',
    message: 'Please choose which social you want to init',
    choices: ['Facebook', 'Instagram'],
    default: 'Facebook',
  });
  const answers = await inquirer.prompt(questions);
  
  if (answers.social === 'Facebook') {
    const facebookQuestions = [];
    
  }
  FB.api('oauth/access_token', {
    client_id: '358171835119730',
    client_secret: '8f38f0f09444be31cc97cd13914d89ab',
    grant_type: 'client_credentials'
  }, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    const accessToken = res.access_token;
    console.log('acc', accessToken);
  });
  console.log('hello', answers);
  return options;
}

async function promptStatusOptions(options) {
  let config;
  try {
    config = require('../crowdrz.json');
  } catch(e) {
    ora('Configuration was not found, run `crowdrz --init` to initialize library').fail();
    return options;
  }

  const social = {
    facebook: config.facebook || false,
    instagram: config.instagram || false
  }

  console.log(chalk.bold('Crowdrz social status :'));
  console.log(chalk.gray('run crowdrz --init to init social\n'))

  if (social.facebook && social.facebook.apiKey) {
    ora('Facebook').succeed();
  } else {
    ora('Facebook').fail();
  }

  if (social.instagram && social.instagram.apiKey) {
    ora('Instagram').succeed();
  } else {
    ora('Instagram').fail();
  }
  return options;
}
   
export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  if (options.runStatus) {
    options = await promptStatusOptions(options);
  }
  if (options.runInit) {
    options = await promptInitOptions(options);
  }
  if (options.runProcess) {
    options = await promptSocialOptions(options);
    options = await promptRunProcessOptions(options);
    let { social, script } = options;
    scriptList[social][script]();
  }
}
