import { createInterface } from "node:readline/promises";
import type { Question, Answers } from "../types/questionList.js";

const readUserInput = async (questionsList: Question[]): Promise<Answers> => {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answers: Answers = {};

  try {
    for (const question of questionsList) {
      if (question.type === "input") {
        const answer = await readline.question(`${question.message}: `);
        answers[question.name] = answer;
      }

      if (question.type === "list" && question.choices) {
        console.log(`${question.message}:`);
        question.choices.forEach((choice, index) => {
          console.log(`  ${index + 1}. ${choice}`);
        });

        let selected: string | undefined;

        while (!selected) {
          const input = await readline.question("Choose an option by number: ");
          const index = parseInt(input, 10) - 1;

          if (!isNaN(index) && question.choices[index]) {
            selected = question.choices[index];
            answers[question.name] = selected;
          } else {
            console.log("Invalid selection. Please enter a valid number.");
          }
        }
      }
    }
  } catch (error) {
    console.error("Something went wrong:", error);
  } finally {
    readline.close();
  }
  return answers;
};

export { readUserInput };
