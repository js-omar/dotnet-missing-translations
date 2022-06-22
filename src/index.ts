#! /usr/bin/env node
import { prompt } from 'inquirer';
import yargs from 'yargs';
import ora from 'ora';
import { blue, green } from 'chalk';
import { isDotnetProject } from './utils/is-dot-net-project';
import { throwErrorMsg } from './utils/throw-error';
import { firstGetMissingStrings } from './actions/1-get-missing-strings';
import { secondGenerateEnglishValue } from './actions/2-generate-english-value';
import { thirdGenerateArabicValue } from './actions/3-generate-arabic-value';
import { fourthWriteMissingStrings } from './actions/4-write-missing-strings';
import { fifthReGenerateEnglishResources } from './actions/5-regenerate-english-resources';
import { sixthReGenerateArabicResources } from './actions/6-regenerate-arabic-resources';

(async () => {
  if (!isDotnetProject()) throwErrorMsg('Navigate to dotnet project first');

  const choices = [
    '1- Get Missing Strings',
    '2- Generate English Values',
    '3- Generate Arabic Values',
    '4- Write Missing Strings',
    '5- Run All Above',
    '6- ReGenerate All English Values',
    '7- ReGenerate All Arabic Values',
  ] as const;

  const args = await yargs(process.argv.slice(2))
    .usage('\nUsage: npx @js-omar/dotnet-missing-translations')
    .help(true).argv;

  const isValidAnswer = /^[1-7]$/g.test(args._[0]?.toString());

  const { action } = isValidAnswer
    ? { action: choices[+args._[0] - 1] }
    : await prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What do you want to do?',
          choices,
        },
      ]);

  const cwd = process.cwd().split('\\');

  const title = blue(`${cwd[cwd.length - 1]} Project`);
  const spinner = ora(title).start();
  spinner.succeed();

  switch (action) {
    case choices[0]: {
      await firstGetMissingStrings(spinner);
      break;
    }
    case choices[1]: {
      secondGenerateEnglishValue(spinner);
      break;
    }
    case choices[2]: {
      await thirdGenerateArabicValue(spinner);
      break;
    }
    case choices[3]: {
      await fourthWriteMissingStrings(spinner);
      break;
    }
    case choices[4]: {
      await firstGetMissingStrings(spinner);
      secondGenerateEnglishValue(spinner);
      await thirdGenerateArabicValue(spinner);
      await fourthWriteMissingStrings(spinner);
      break;
    }
    case choices[5]: {
      await fifthReGenerateEnglishResources(spinner);
      break;
    }
    case choices[6]: {
      await sixthReGenerateArabicResources(spinner);
      break;
    }
    default:
      break;
  }

  spinner.text = green('Done');
  spinner.succeed();
  spinner.stop();
})();
