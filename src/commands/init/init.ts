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
import { editConfigPath, projectStartup } from "./projectStartup.js";
import {
  fixAxiosAndHookManagementPackages,
  installHookManagementPackages,
} from "./hookManagementInstallation.js";

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

    await projectStartup({ projectAnswers: answers });
    Logger.info("� Editing config path...");
    await editConfigPath({ projectAnswers: answers });
    Logger.success("Config path edited successfully ----");

    Logger.info("� Installing hook management packages...");
    await installHookManagementPackages({ projectAnswers: answers });
    Logger.success("Hook management packages installed successfully ----");

    Logger.info("� Fixing axios and hook management packages...");
    await fixAxiosAndHookManagementPackages({ projectAnswers: answers });
    Logger.success(
      "Axios and hook management packages fixed successfully ----"
    );
  } catch (error) {
    console.error("Something went wrong:", error);
    process.exit(1);
  }
};

export { init };
