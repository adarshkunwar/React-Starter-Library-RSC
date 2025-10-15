import type { Question } from "../../types/questionList.js";

const createYNQuestion = ({
  question,
  choice,
  name,
}: {
  name: string;
  question: string;
  choice: string[];
}): Question => {
  return {
    type: "list",
    name: name,
    message: question,
    choices: choice,
  };
};

export { createYNQuestion };
