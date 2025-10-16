import { exec } from "node:child_process";
import { promisify } from "node:util";
import type { ProjectAnswers } from "../../types/questionList.js";

const execAsync = promisify(exec);

const installPackage = async ({
  packageName,
  isDev = false,
  projectAnswers,
}: {
  packageName: string;
  isDev?: boolean;
  projectAnswers: ProjectAnswers;
}) => {
  try {
    const { installation_method, name } = projectAnswers;

    const commands = {
      npm: `npm install ${isDev ? "-D" : ""} ${packageName}`,
      yarn: `yarn add ${isDev ? "-D" : ""} ${packageName}`,
      pnpm: `pnpm add ${isDev ? "-D" : ""} ${packageName}`,
    };

    const command = commands[installation_method];

    await execAsync(command, {
      cwd: name,
    });
  } catch (error) {
    console.error("Package installation failed:", error);
    throw error; // Re-throw to propagate the error
  }
};

export { installPackage };
