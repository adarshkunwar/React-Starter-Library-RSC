import { mkdir } from "node:fs/promises";
import { questionsList } from "../../constant/questionsList.js";
import type { PathLike } from "node:fs";
import { readUserInput } from "../../utils/userInput.js";

const init = async () => {
  const answers = await readUserInput(questionsList);

  const projectName = answers["name"];
  console.log(`\nCreating project "${projectName}" with options:`);
  console.log(JSON.stringify(answers, null, 2));

  await mkdir(projectName as PathLike, { recursive: true });
  console.log(`Project folder "${projectName}" created successfully.`);
};

export { init };
