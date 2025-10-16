import { spawn } from "node:child_process";
import { hasCommand } from "../../utils/commands/hasCommand.js";
import type { ProjectAnswers } from "../../types/questionList.js";
import { fixViteConfig, installTailwindCSS } from "./installTailwind.js";

const reactStarter = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  const { name, installation_method } = projectAnswers;

  if (!(await hasCommand(installation_method))) {
    console.error(`${installation_method} is not installed`);
    process.exit(1);
  }

  // Use degit to clone the Vite template without prompts
  console.log("📦 Creating React project...");

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
      code === 0 ? resolve(true) : reject(new Error("Project creation failed"))
    )
  );

  // Now install dependencies with the user's preferred package manager
  console.log(`📦 Installing dependencies with ${installation_method}...`);

  const installCommands = {
    npm: ["npm", ["install"]],
    yarn: ["yarn", ["install"]],
    pnpm: ["pnpm", ["install"]],
  } as const;

  const [installCmd, installArgs] = installCommands[installation_method];

  const installProcess = spawn(installCmd, installArgs, {
    cwd: name, // Run in the project directory
    shell: true,
    stdio: "inherit",
  });

  await new Promise((resolve, reject) =>
    installProcess.on("close", (code) =>
      code === 0 ? resolve(true) : reject(new Error("Installation failed"))
    )
  );

  await installTailwindCSS(projectAnswers);
  await fixViteConfig({ projectAnswers });
};

export { reactStarter };
