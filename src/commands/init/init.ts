import {
  confirmQuestion,
  questionsList,
} from "../../constant/questionsList.js";
import {
  readUserInputList,
  readSingleListInput,
} from "../../utils/helper/userInput.js";
import { reactStarter } from "./react-starter.js";
import { Logger } from "../../utils/helper/logger.js";
import type { ProjectAnswers } from "../../types/questionList.js";
import { projectStartup } from "./projectStructure.js";
import { CreateConfig, InstallPackages } from "./packages.js";

const init = async () => {
  try {
    // read the input from the user
    const answers = await readUserInputList<ProjectAnswers>(questionsList);
    const confirm = await readSingleListInput(confirmQuestion);
    if (confirm === "No") {
      console.log("Project creation cancelled.");
      process.exit(1);
    }
    Logger.success("Project creation confirmed. Proceeding with setup...");

    await reactStarter({ projectAnswers: answers });

    await projectStartup({ projectAnswers: answers });

    await CreateConfig({ projectAnswers: answers });
    await InstallPackages({ projectAnswers: answers });
  } catch (error) {
    console.error("Something went wrong:", error);
    process.exit(1);
  }
};

export { init };
