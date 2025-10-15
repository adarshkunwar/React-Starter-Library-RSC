import { type ProjectAnswers, type Question } from "../types/questionList.js";
import { createYNQuestion } from "../utils/helper/createQuestion.js";

// Fix: naming consistency — use PascalCase for exports and ensure they are const arrays
export const stylingLibraryList = [
  "tailwindcss",
  "css-modules",
  "styled-components",
] as const;

export const projectStructureList = ["feature-folder", "monorepo"] as const;

export const installationMethodList = ["npm", "yarn", "pnpm"] as const;

// Use the imported Question interface for consistent typing
export const questionsList: Question<ProjectAnswers>[] = [
  {
    type: "input",
    name: "name",
    message: "Enter the name of the project",
  },
  {
    type: "list",
    name: "styling",
    message: "Choose a styling library",
    choices: [...stylingLibraryList],
  },
  {
    type: "list",
    name: "project_structure",
    message: "Choose a project structure",
    choices: [...projectStructureList],
  },
  {
    type: "list",
    name: "installation_method",
    message: "Choose an installation method",
    choices: [...installationMethodList],
  },
];

export const confirmQuestion = createYNQuestion<{ confirm: string }>({
  question: "Are you sure you want to continue?",
  choice: ["Yes", "No"],
  name: "confirm",
});
