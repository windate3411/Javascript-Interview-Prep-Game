import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

const questionList = [
  {
    id: 1,
    codeSnippet:
      "\nfunction demo() {\n  var a = 5;\n  for (let i = 0; i < 1; i++) {\n    let b = 10\n  }\n  console.log(a)\n  console.log(b)\n}\n",
    choices: [
      "5 10",
      "5 undefined",
      "undefined undefined",
      "None of the above",
    ],
    correctAnswerIndex: 3,
    concepts: ["scope", "Danny", "wang"],
  },
  {
    id: 2,
    codeSnippet:
      "\n(function(){\n  var a = b = 3\n})();\n\nconsole.log(typeof a !== 'undefined');\nconsole.log(typeof b !== 'undefined');\n",
    choices: ["true true", "true false", "false true", "false false"],
    correctAnswerIndex: 2,
    concepts: ["scope"],
  },
  {
    id: 3,
    codeSnippet:
      "\nlet salary = '1000';\n\n(function () {\n  console.log(salary);\n  \n  var salary = '5000';\n  \n  console.log(salary);\n})();\n",
    choices: [
      "5000 1000",
      "1000 undefined",
      "undefined 5000",
      "None of the above",
    ],
    correctAnswerIndex: 2,
    concepts: ["scope", "hoist"],
  },
  {
    id: 4,
    codeSnippet:
      "\ngreet1();\ngreet2();\n\n\nvar greet1 = () => {\n  console.log('Hello')\n}\n\nfunction greet2 () {\n  console.log('Hola')\n}\n",
    choices: ["Uncaught TypeError", "Hello Hola", "Hola Hello"],
    correctAnswerIndex: 0,
    concepts: ["hoist", "function expression"],
  },
  {
    id: 5,
    codeSnippet:
      "\nconst arrA = [1, 2, 3]\nconst arrB = arrA\nlet textA = 'Danny'\nlet textB = textA\n\narrB.push(4)\ntextB = 'Wang'\n\nconsole.log(arrA)\nconsole.log(textA)\n",
    choices: [
      "[1, 2, 3] Danny",
      "[1, 2, 3] Wang",
      "[1, 2, 3, 4] Danny",
      "[1, 2, 3, 4] Wang",
    ],
    correctAnswerIndex: 2,
    concepts: ["call by value", "call by reference"],
  },
  {
    id: 6,
    codeSnippet:
      "\nconst objA = {}\nconst objB = {}\nlet textA = 'danny'\ntextA.toUpperCase()\n\nconsole.log(objA === objB)\nconsole.log(textA)\n",
    choices: ["true DANNY", "false DANNY", "None of the above"],
    correctAnswerIndex: 2,
    concepts: ["call by value", "call by reference", "primitive value"],
  },
  {
    id: 7,
    codeSnippet:
      "\nlet bar = true;\nconsole.log(bar + 0);\nconsole.log(bar + 'xyz');\nconsole.log(bar + true);\nconsole.log(bar + false);\n",
    choices: [
      "1 1xyz 2 1",
      "1 truexyz 2 1",
      "1 truexyz truetrue truefalse",
      "None of the above",
    ],
    correctAnswerIndex: 1,
    concepts: ["coercion"],
  },
  {
    id: 8,
    codeSnippet:
      "\nconsole.log(null == undefined);\nconsole.log(1 == '1');\nconsole.log('false' == 0);\nconsole.log(NaN == NaN);\n",
    choices: [
      "true true false false",
      "true true false true",
      "false true false false",
      "None of the above",
    ],
    correctAnswerIndex: 0,
    concepts: ["coercion"],
  },
  {
    id: 9,
    codeSnippet: "\nconst result = 0 && 3 || 1 && 2\nconsole.log(result)\n",
    choices: ["0", "2", "3", "None of the above"],
    correctAnswerIndex: 1,
    concepts: ["logical operator"],
  },
  {
    id: 10,
    codeSnippet:
      "\nfunction demo() {\n  for (var i = 1; i < 5; i++) {\n    setTimeout(() => {\n      console.log(i)\n    }, 1000)\n  }\n}\n\ndemo()\n",
    choices: ["1 2 3 4", "4 4 4 4", "Throw Error", "None of the above"],
    correctAnswerIndex: 3,
    concepts: ["scope", "event loop"],
  },
];

let playerName;
let currentQuestionIndex = 0;
await welcome();
await getUserName();
await displayQuestion(currentQuestionIndex);

async function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), duration);
  });
}

async function welcome() {
  const welcomeText = chalkAnimation.karaoke(
    "Ahh....., I understand you wanna be a junior developer. Let's see if you got what it takes..."
  );
  welcomeText.render();
  await delay(2700);
  welcomeText.stop();
  console.log(`
        ${chalk.bgGray("Game Rules")}
        ${chalk.cyan(`
        As the chosen one who is meant to crash all coding interviews
        You will be asked a series of javascript questions
        For every 10 questions, the questions will get slightly harder
        Answer all the questions correctly to win the grand prize
        Remember. Just like all the interviews, ${chalk.red(
          "YOU ONLY GET ONE SHOT"
        )}
        `)}
      `);
}

async function getUserName() {
  const answer = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message:
      "Enter your name, you brave little bastard. And the game will be started...",
    default() {
      return "Player";
    },
  });
  playerName = answer.player_name;
}

async function handleAnswer(isCorrect, concepts) {
  const spinner = createSpinner("Checking your answer").start();
  await delay(2000);
  if (isCorrect) {
    spinner.success({
      text: "Job nicely done...You may continue your journey",
    });
    currentQuestionIndex++;
    await delay(1000);

    if (currentQuestionIndex < questionList.length) {
      await displayQuestion(currentQuestionIndex);
    } else {
      process.exit(1);
    }
  } else {
    spinner.error({
      text: "You've chosen the wrong answer...The interviewer shows you the door...Game over!",
    });
    const msg = `
      Looks like you are not that familiar with the following concepts

      ${concepts.join(", ")}

      Do not fear, master the concepts then come back for another try....  
    `;
    console.log(gradient.cristal.multiline(msg));
    process.exit(1);
  }
}

async function displayQuestion(index) {
  const currentQuestion = questionList[index];
  const { choices, correctAnswerIndex, id, codeSnippet, concepts } =
    currentQuestion;
  const answer = await inquirer.prompt({
    name: "question",
    type: "list",
    message: `Q${id}: What is the expected output of the following code snippet?
        ${chalk.yellow(codeSnippet)}    
        `,
    choices,
  });
  return handleAnswer(
    answer.question === choices[correctAnswerIndex],
    concepts
  );
}
