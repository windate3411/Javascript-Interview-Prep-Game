#!/usr/bin/env node

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
    concepts: ["scope"],
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
  {
    id: 11,
    codeSnippet:
      "\nconst addNum = (num) => {\n  return (arg) => {\n    return num + arg\n  }\n}\n\nconst add2 = addNum(2)\nconsole.log(add2(10))\n",
    choices: ["2", "10", "12", "None of the above"],
    correctAnswerIndex: 2,
    concepts: ["scope", "closure"],
  },
  {
    id: 12,
    codeSnippet:
      "\nconst arr = [1, 2, 3, 4]\nconst x = arr.push(5)\nconst y = arr.pop()\n\nconsole.log(x === y)\n",
    choices: ["true", "false"],
    correctAnswerIndex: 0,
    concepts: ["array methods"],
  },
  {
    id: 13,
    codeSnippet:
      "\nconst arrA = [5, 3, 2, 1, 7];\nconst arrB = [1, 2, 3, 5, 7];\narrA.sort();\nconsole.log(arrA === arrB)\n",
    choices: ["true", "false"],
    correctAnswerIndex: 1,
    concepts: ["array methods", "call by reference"],
  },
  {
    id: 14,
    codeSnippet:
      "\nconst arr = [1, 2, 5, 2, 3, 4];\n\nconst checkTwo = (num) => {\n  return num === 2\n}\n\nconst resultA = arr.find(checkTwo)\nconst resultB = arr.filter(checkTwo)\n\nconsole.log(resultA)\nconsole.log(resultB)\n",
    choices: ["2 [2, 2]", "[2, 2] [2, 2]", "[2, 2] 2", "None of the above"],
    correctAnswerIndex: 0,
    concepts: ["array methods"],
  },
  {
    id: 15,
    codeSnippet:
      "\nconst arr = [1, 2, 3, 4, 5]\nconst newArr = arr.map(item => {\n  item * 2\n})\nconsole.log(newArr)\n",
    choices: ["[2, 4, 6, 8, 10]", "[1, 2, 3, 4, 5]", "None of the above"],
    correctAnswerIndex: 2,
    concepts: ["array methods"],
  },
  {
    id: 16,
    codeSnippet:
      "\nconst arr = [1, 2, 3, 4, 5]\nconst newArr = arr.map(item => {\n  item * 2\n})\nconsole.log(newArr)\n",
    choices: ["[2, 4, 6, 8, 10]", "[1, 2, 3, 4, 5]", "None of the above"],
    correctAnswerIndex: 2,
    concepts: ["array methods"],
  },
  {
    id: 17,
    codeSnippet:
      "\nvar name = 'globalName'\nvar auntie = {\n  name: 'localName',\n  callName: function () { \n    console.log(this.name);\n  },\n  callName2: () => { \n    console.log(this.name);\n  }\n }\n auntie.callName();\n auntie.callName2();\n",
    choices: [
      "undefined globalName",
      "globalName localName",
      "localName globalName",
      "None of the above",
    ],
    correctAnswerIndex: 2,
    concepts: ["this"],
  },
  {
    id: 18,
    codeSnippet:
      "\nvar hero = {\n    _name: 'Danny Wang',\n    getSecretIdentity: function (){\n        return this._name;\n    }\n};\n\nvar stoleSecretIdentity = hero.getSecretIdentity;\n\nconsole.log(stoleSecretIdentity());\nconsole.log(hero.getSecretIdentity());\n",
    choices: [
      "Danny Wang Danny Wang",
      "Danny Wang undefined",
      "undefined Danny Wang",
      "undefined undefined",
    ],
    correctAnswerIndex: 2,
    concepts: ["this"],
  },
  {
    id: 19,
    codeSnippet:
      "\nvar count = 50\n\nconst obj = {\n  count: 100\n}\n\nfunction getCount() {\n  return this.count\n}\n\nconst countA = getCount.call(obj)\nconst countB = getCount()\nconst countC = getCount.apply(obj, [])\n\nconsole.log(countA, countB, countC)\n",
    choices: [
      "50 50 100",
      "100 50 100",
      "50 undefined 100",
      "100 50 undefined",
    ],
    correctAnswerIndex: 2,
    concepts: ["this"],
  },
  {
    id: 20,
    codeSnippet:
      "\nconsole.log('start')\n\nconst promise1 = new Promise((resolve, reject) => {\n  console.log(1)\n})\n\nconsole.log('end');\n",
    choices: ["start 1 end", "start end 1", "start end", "None of the above"],
    correctAnswerIndex: 0,
    concepts: ["promise", "event loop"],
  },
  {
    id: 21,
    codeSnippet:
      "\nconsole.log(1)\nsetTimeout(()=> {\n  console.log(2)\n}, 100)\nsetTimeout(()=> {\n  console.log(3)\n}, 0)\nconsole.log(4)\n",
    choices: ["1 3 4 2", "1 4 2 3", "1 4 3 2", "None of the above"],
    correctAnswerIndex: 2,
    concepts: ["event loop"],
  },
  {
    id: 22,
    codeSnippet:
      "\nconsole.log('start');\n\nconst promise1 = new Promise((resolve, reject) => {\n  console.log(1)\n  resolve(2)\n})\n\npromise1.then(res => {\n  console.log(res)\n})\n\nconsole.log('end');\n",
    choices: [
      "start end 1 2",
      "start end 2 1",
      "start 1 end 2",
      "None of the above",
    ],
    correctAnswerIndex: 2,
    concepts: ["event loop", "promise"],
  },
  {
    id: 23,
    codeSnippet:
      "\nsetTimeout(() => console.log('timeout'));\n\nPromise.resolve()\n  .then(() => console.log('promise'));\n\nconsole.log('global');\n",
    choices: [
      "timeout promise global",
      "timeout global promise",
      "promise timeout global",
      "None of the above",
    ],
    correctAnswerIndex: 3,
    concepts: ["event loop", "promise", "micro task"],
  },
  {
    id: 24,
    codeSnippet:
      "\nconst promise = new Promise((resolve,reject)=> {\n  console.log(1)\n  resolve(5)\n  console.log(2)\n  reject(6)\n})\n\npromise.then((value)=> {\n  console.log(value)\n  console.log(3)\n}).catch(value => {\n  console.log(value)\n})\n\nconsole.log(4)\n",
    choices: ["1 2 3 4 5", "1 2 3 4 6", "1 2 4 3 5", "None of the above"],
    correctAnswerIndex: 3,
    concepts: ["promise", "event loop"],
  },
  {
    id: 25,
    codeSnippet:
      "\nconsole.log(1);\n\nsetTimeout(() => {\n  console.log(2);\n  Promise.resolve().then(() => {\n    console.log(3)\n  });\n}, 0);\n\nnew Promise((resolve, reject) => {\n  console.log(4)\n  resolve(5)\n}).then((data) => {\n  console.log(data);\n})\n\nsetTimeout(() => {\n  console.log(6);\n}, 0)\n\nconsole.log(7);\n",
    choices: [
      "1 4 7 5 2 3 6",
      "1 7 2 3 4 5 6",
      "1 4 7 2 6 3 5",
      "None of the above",
    ],
    correctAnswerIndex: 0,
    concepts: ["event loop", "promise", "micro task"],
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
      await displayWinningMsg();
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

async function displayWinningMsg() {
  console.clear();
  const msg = `Congrats! ${playerName}! \n\nYou really crash them all!`;
  figlet(msg, async (err, result) => {
    console.log(gradient.pastel.multiline(result));

    await delay(1000);
    console.log(
      chalk.yellow("In case you're wondering what's the grand prize....")
    );
    await delay(1000);
    console.log(
      chalk.yellow(
        "I really don't have much to offer, but you can check out my blog post about series of js interview questions for more pracitice!"
      )
    );
    await delay(1000);
    console.log(
      chalk.cyan(
        "Here you go! Hope you enjoy the game! https://eruditeness.news.blog/tag/2021iron/"
      )
    );
    process.exit(1);
  });
}
