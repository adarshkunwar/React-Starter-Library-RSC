import { mkdir } from "node:fs/promises";
import {
  confirmQuestion,
  questionsList,
} from "../../constant/questionsList.js";
import type { PathLike } from "node:fs";
import {
  readUserInputList,
  readSingleListInput,
} from "../../utils/helper/userInput.js";

const init = async () => {
  try {
    const answers = await readUserInputList(questionsList);

    const projectName = answers["name"];

    if (!projectName || projectName.trim() === "") {
      console.error("Project name is required and cannot be empty.");
      return;
    }
    const confirm = await readSingleListInput(confirmQuestion);
    if (confirm === "No") {
      console.log("Project creation cancelled.");
      process.exit(1);
    }

    console.log(`\nCreating project "${projectName}" with options:`);
    console.log(JSON.stringify(answers, null, 2));

    await mkdir(projectName as PathLike, { recursive: true });
    console.log(`Project folder "${projectName}" created successfully.`);

    console.log("Project creation confirmed. Proceeding with setup...");
  } catch (error) {
    console.error("Something went wrong:", error);
    process.exit(1);
  }
};

export { init };
