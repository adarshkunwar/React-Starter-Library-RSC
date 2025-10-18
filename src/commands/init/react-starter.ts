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
import { installPackage } from "../../utils/commands/installCommand.js";
import { config } from "../../constant/config.js";
import { writeFile } from "node:fs/promises";
import {
  LINTER_AND_FORMATTER_PACKAGES,
  TAILWIND_PACKAGES,
} from "../../constant/packages.js";

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

const setupTailwind = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}): Promise<void> => {
  Logger.info("🎨 Installing Tailwind CSS...");
  await installPackage({
    packageName: TAILWIND_PACKAGES.join(" "),
    projectAnswers,
  });

  await writeFile(
    `${projectAnswers.name}/src/index.css`,
    config({ projectAnswers }).indexCSS
  );
  Logger.success("Tailwind CSS installed successfully");
};

const setupViteConfig = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}): Promise<void> => {
  Logger.info("⚙️  Configuring Vite...");
  await writeFile(
    `${projectAnswers.name}/vite.config.ts`,
    config({ projectAnswers }).viteConfig
  );
  Logger.success("Vite config updated successfully");
};

const setupLinterAndFormatter = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}): Promise<void> => {
  Logger.info("🔧 Installing ESLint and Prettier...");
  await installPackage({
    packageName: LINTER_AND_FORMATTER_PACKAGES.join(" "),
    projectAnswers,
  });
  Logger.success("Linter and formatter installed successfully");
};

const setupEslintConfig = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}): Promise<void> => {
  Logger.info("📝 Creating ESLint config...");
  await writeFile(
    `${projectAnswers.name}/eslint.config.js`,
    config({ projectAnswers }).eslintConfig
  );
  await writeFile(
    `${projectAnswers.name}/.prettierrc`,
    config({ projectAnswers }).prettierRC
  );
  await writeFile(
    `${projectAnswers.name}/.prettierignore`,
    config({ projectAnswers }).prettierIgnore
  );

  Logger.success("ESLint config created successfully");
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

    await setupTailwind({ projectAnswers });
    await setupViteConfig({ projectAnswers });
    await setupLinterAndFormatter({ projectAnswers });
    await setupEslintConfig({ projectAnswers });

    Logger.success(`\n✨ Project "${name}" created successfully!`);
  } catch (error) {
    Logger.error("Failed to create project", error);
    process.exit(1);
  }
};

export { reactStarter };
