import { createInterface } from "node:readline/promises";
import type { Question, Answers } from "../../types/questionList.js";

const readSingleStringInput = async <T>(
  question: Question<T>
): Promise<string> => {
  let answer = "";
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  if (question.type !== "input") throw new Error("Invalid question type");

  try {
    answer = await readline.question(`${question.message}: `);
  } catch (error) {
    console.error("Something went wrong:", error);
  } finally {
    readline.close();
  }
  return answer;
};

const readSingleListInput = async <T>(
  question: Question<T>
): Promise<string> => {
  let answer = "";
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  if (question.type !== "list") throw new Error("Invalid question type");
  if (!question.choices) throw new Error("Choices are required");

  try {
    console.log(`${question.message}:`);
    question.choices.forEach((choice, index) => {
      console.log(`  ${index + 1}. ${choice}`);
    });

    let chosen = await readline.question(`${question.message}: `);

    if (
      !isNaN(parseInt(chosen, 10)) &&
      question.choices[parseInt(chosen, 10) - 1]
    ) {
      answer = question.choices[parseInt(chosen, 10) - 1] as string;
    } else {
      console.log("Invalid selection. Please enter a valid number.");
    }
  } catch (error) {
    console.error("Something went wrong:", error);
  } finally {
    readline.close();
  }

  return answer;
};

const readUserInputList = async <T extends { [K in keyof T]: string }>(
  questionsList: Question<T>[]
): Promise<T> => {
  const answers: Partial<T> = {};
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    for (const question of questionsList) {
      if (question.type === "input") {
        const answer = await readline.question(`${question.message}: `);
        answers[question.name as keyof T] = answer as T[keyof T];
      }

      if (question.type === "list" && question.choices) {
        question.choices.forEach((choice, index) => {
          console.log(`  ${index + 1}. ${choice}`);
        });

        let selected: string | undefined;

        while (!selected) {
          const input = await readline.question("Choose an option by number: ");
          const index = parseInt(input, 10) - 1;

          if (!isNaN(index) && question.choices[index]) {
            selected = question.choices[index];
            answers[question.name as keyof T] = selected as T[keyof T];
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
  return answers as T;
};

export { readUserInputList, readSingleStringInput, readSingleListInput };
