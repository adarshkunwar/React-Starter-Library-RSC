import type { TPackage } from "../../types/packaged.js";
import type { ProjectAnswers } from "../../types/questionList.js";
import { Logger } from "../helper/logger.js";
import { runCommand } from "../helper/runCommand.js";

export const installPackage = async ({
  packageName,
  isDev = false,
  projectAnswers,
}: {
  packageName: string;
  isDev?: boolean;
  projectAnswers: ProjectAnswers;
}) => {
  const { installation_method, name } = projectAnswers;
  const command = installation_method;
  const args = [
    installation_method === "npm" ? "install" : "add",
    packageName,
    ...(isDev ? ["-D"] : []),
  ];

  try {
    await runCommand(command, args, {
      cwd: name,
      shell: true,
      stdio: "inherit",
    });
  } catch (error) {
    console.error(`Failed to install ${packageName}:`, error);
    throw error;
  }
};

export const installAndLog = async ({
  pkg,
  projectAnswers,
}: {
  pkg: TPackage;
  projectAnswers: ProjectAnswers;
}) => {
  try {
    await installPackage({
      packageName: pkg.packages.join(" "),
      isDev: pkg.isDevTool,
      projectAnswers,
    });
    Logger.success(`✅ ${pkg.description} installed successfully`);
  } catch (error) {
    Logger.error(`❌ Failed to install ${pkg.description}`, error);
    throw error;
  }
};
