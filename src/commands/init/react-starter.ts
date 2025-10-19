import { spawn } from "node:child_process";
import { hasCommand } from "../../utils/commands/hasCommand.js";
import type {
  InstallationMethod,
  ProjectAnswers,
} from "../../types/questionList.js";
import { Logger } from "../../utils/helper/logger.js";
import { INSTALL_COMMANDS } from "../../constant/commands.js";
import { existsSync, renameSync } from "node:fs";
import { runCommand } from "../../utils/helper/runCommand.js";
import { writeFile } from "node:fs/promises";

const scaffoldProject = async (projectName: string): Promise<void> => {
  Logger.info("📦 Creating React project...");

  await runCommand(
    "npx",
    [
      "degit",
      "vitejs/vite/packages/create-vite/template-react-ts",
      projectName,
    ],
    { shell: true, stdio: "inherit" }
  );
  Logger.success("Project scaffolded successfully");
};

const fixGitignore = async (projectName: string): Promise<void> => {
  try {
    const gitignorePath = `${projectName}/_gitignore`;
    if (existsSync(gitignorePath)) {
      renameSync(gitignorePath, `${projectName}/.gitignore`);
    }
  } catch (error) {
    Logger.error("Failed to fix gitignore", error);
    throw error;
  }
};

const installDependencies = async (
  projectName: string,
  installMethod: InstallationMethod
): Promise<void> => {
  Logger.info(`📦 Installing dependencies with ${installMethod}...`);

  const [command, args] = INSTALL_COMMANDS[installMethod];
  await runCommand(command, args, {
    cwd: projectName,
    shell: true,
    stdio: "inherit",
  });

  Logger.success("Base dependencies installed successfully");
};

export const createConfig = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}): Promise<void> => {
  try {
    const configPath = `${projectAnswers.name}/rsc.config.json`;
    const configContent = JSON.stringify(projectAnswers, null, 2);

    await writeFile(configPath, configContent, "utf8");
    Logger.success("Config created successfully");
  } catch (error) {
    Logger.error("Failed to create config", error);
    throw error;
  }
};

const reactStarter = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  const { name, installation_method } = projectAnswers;

  try {
    if (!(await hasCommand(installation_method))) {
      Logger.error(`${installation_method} is not installed`);
      process.exit(1);
    }

    await scaffoldProject(projectAnswers.name);
    await fixGitignore(projectAnswers.name);
    await installDependencies(projectAnswers.name, installation_method);

    await createConfig({ projectAnswers });

    Logger.success(`\n✨ Project "${name}" created successfully!`);
  } catch (error) {
    Logger.error("Failed to create project", error);
    process.exit(1);
  }
};

export { reactStarter };
