import {
  type Answers,
  type ProjectAnswers,
  type Question,
} from "../types/questionList.js";
import { INSTALLATION_METHOD_OPTIONS } from "./commands.js";
import { PROJECT_STRUCTURE_OPTIONS } from "./commands.js";

// Use the imported Question interface for consistent typing
export const questionsList: Question<ProjectAnswers>[] = [
  {
    type: "input",
    name: "name",
    message: "Enter the name of the project",
  },
  {
    type: "list",
    name: "project_structure",
    message: "Choose a project structure",
    choices: [...PROJECT_STRUCTURE_OPTIONS],
  },
  {
    type: "list",
    name: "installation_method",
    message: "Choose an installation method",
    choices: [...INSTALLATION_METHOD_OPTIONS],
  },
];

export const confirmQuestion: Question<Answers> = {
  type: "list",
  name: "confirm",
  message: "Are you sure you want to continue?",
  choices: ["Yes", "No"],
};
