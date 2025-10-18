import { spawn } from "node:child_process";
import { hasCommand } from "../../utils/commands/hasCommand.js";
import type { ProjectAnswers } from "../../types/questionList.js";
import { Logger } from "../../utils/helper/logger.js";
import { existsSync, renameSync } from "node:fs";
import {
  fixViteConfig,
  installEslintConfig,
  installLinterAndFormatter,
  installTailwindCSS,
} from "./installTailwind.js";

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

    // Use degit to clone the Vite template without prompts
    Logger.info("📦 Creating React project...");
    const degitCommand = spawn(
      "npx",
      ["degit", "vitejs/vite/packages/create-vite/template-react-ts", name],
      {
        shell: true,
        stdio: "inherit",
      }
    );

    await new Promise((resolve, reject) =>
      degitCommand.on("close", (code) =>
        code === 0
          ? resolve(true)
          : reject(new Error("Project creation failed"))
      )
    );

    Logger.success("Project scaffolded successfully");

    const gitignorePath = `${projectAnswers.name}/_gitignore`;
    if (existsSync(gitignorePath)) {
      renameSync(gitignorePath, `${projectAnswers.name}/.gitignore`);
    }

    // Now install dependencies with the user's preferred package manager
    Logger.info(`📦 Installing dependencies with ${installation_method}...`);
    const installCommands = {
      npm: ["npm", ["install"]],
      yarn: ["yarn", ["install"]],
      pnpm: ["pnpm", ["install"]],
    } as const;

    const [installCmd, installArgs] = installCommands[installation_method];
    const installProcess = spawn(installCmd, installArgs, {
      cwd: name,
      shell: true,
      stdio: "inherit",
    });

    await new Promise((resolve, reject) =>
      installProcess.on("close", (code) =>
        code === 0 ? resolve(true) : reject(new Error("Installation failed"))
      )
    );

    Logger.success("Base dependencies installed successfully");

    // Install Tailwind CSS
    Logger.info("🎨 Installing Tailwind CSS...");
    await installTailwindCSS({ projectAnswers });
    Logger.success("Tailwind CSS installed successfully");

    // Fix Vite config
    Logger.info("⚙️  Configuring Vite...");
    await fixViteConfig({ projectAnswers });

    // Install linter and formatter
    Logger.info("🔧 Installing ESLint and Prettier...");
    await installLinterAndFormatter({ projectAnswers });
    Logger.success("Linter and formatter installed successfully");

    // Install ESLint config
    Logger.info("📝 Creating config files...");
    await installEslintConfig({ projectAnswers });

    Logger.success(`\n✨ Project "${name}" created successfully!`);
    Logger.info(`\nNext steps:`);
    Logger.info(`  cd ${name}`);
    Logger.info(`  ${installation_method} dev\n`);
  } catch (error) {
    Logger.error("Failed to create project", error);
    process.exit(1);
  }
};

export { reactStarter };
