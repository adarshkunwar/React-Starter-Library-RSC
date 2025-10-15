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

  console.log(
    "you have the projectAnswers installation method",
    installation_method
  );

  const child = spawn("npm", ["create", "vite@latest", name], {
    shell: true,
    stdio: "inherit", // This passes through the interactive prompts
  });

  child.stdout?.on("data", (data) => {
    console.log(data.toString());
  });
};

export { reactStarter };
