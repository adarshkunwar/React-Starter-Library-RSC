import type { Question } from "../../types/questionList.js";

const createYNQuestion = <T>({
  question,
  choice,
  name,
}: {
  name: string;
  question: string;
  choice: string[];
}): Question<T> => {
  return {
    type: "list",
    name: name as keyof T,
    message: question,
    choices: choice,
  };
};

export { createYNQuestion };
