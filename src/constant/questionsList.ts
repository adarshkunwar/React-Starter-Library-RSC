import { type Question } from "../types/questionList.js";

const questionsList: Question[] = [
  {
    type: "input",
    name: "name",
    message: "Enter the name of the project",
  },
  {
    type: "list",
    name: "styling",
    message: "Choose a styling library",
    choices: ["tailwindcss", "css-modules", "styled-components"],
  },
  {
    type: "list",
    name: "project_structure",
    message: "Choose a project structure",
    choices: ["feature-folder", "monorepo"],
  },
  {
    type: "list",
    name: "installation_method",
    message: "Choose a installation method",
    choices: ["npm", "yarn", "pnpm"],
  },
];

export { questionsList };
