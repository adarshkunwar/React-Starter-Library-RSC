import { exec } from "node:child_process";
import { promisify } from "node:util";
import type { ProjectAnswers } from "../../types/questionList.js";
import { Logger } from "../helper/logger.js";

const execAsync = promisify(exec);

const installPackage = async ({
  packageName,
  projectAnswers,
  isDev = false,
}: {
  packageName: string;
  projectAnswers: ProjectAnswers;
  isDev?: boolean;
}) => {
  try {
    await execAsync(
      `${projectAnswers.installation_method} install ${
        isDev ? "-D" : ""
      } ${packageName}`,
      {
        cwd: projectAnswers.name,
      }
    );
    Logger.success(`${packageName} installed successfully`);
  } catch (error) {
    Logger.error("Something went wrong:", error);
    process.exit(1);
  }
};

export { installPackage };
