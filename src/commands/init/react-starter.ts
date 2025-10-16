import { hasCommand } from "../../utils/commands/hasCommand.js";
import { spawn } from "node:child_process";
import type { ProjectAnswers } from "../../types/questionList.js";

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

  switch (installation_method) {
    case "npm":
      const npmChild = spawn("npm", ["create", "vite@latest", name], {
        shell: true,
        stdio: "inherit", // This passes through the interactive prompts
      });

      npmChild.stdout?.on("data", (data) => {
        console.log(data.toString());
      });
      break;
    case "yarn":
      const yarnChild = spawn("yarn", ["create", "vite", name], {
        shell: true,
        stdio: "inherit", // This passes through the interactive prompts
      });

      yarnChild.stdout?.on("data", (data) => {
        console.log(data.toString());
      });
      break;
    case "pnpm":
      const pnpmChild = spawn("pnpm", ["create", "vite", name], {
        shell: true,
        stdio: "inherit", // This passes through the interactive prompts
      });

      pnpmChild.stdout?.on("data", (data) => {
        console.log(data.toString());
      });
      break;
    default:
      console.error(`${installation_method} is not supported`);
      process.exit(1);
  }
};

export { reactStarter };
