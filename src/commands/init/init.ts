import {
  confirmQuestion,
  questionsList,
} from "../../constant/questionsList.js";
import {
  readUserInputList,
  readSingleListInput,
} from "../../utils/helper/userInput.js";
import { reactStarter } from "./react-starter.js";
import { createConfig } from "./createConfig.js";
import { Logger } from "../../utils/helper/logger.js";
import type { ProjectAnswers } from "../../types/questionList.js";

const init = async () => {
  try {
    const answers = await readUserInputList<ProjectAnswers>(questionsList);

    const confirm = await readSingleListInput(confirmQuestion);
    if (confirm === "No") {
      console.log("Project creation cancelled.");
      process.exit(1);
    }

    Logger.success(
      "Project creation confirmed. Proceeding with setup...",
      answers
    );

    await reactStarter({
      projectAnswers: answers,
    });

    await createConfig({
      projectAnswers: answers,
    });
  } catch (error) {
    console.error("Something went wrong:", error);
    process.exit(1);
  }
};

export { init };
