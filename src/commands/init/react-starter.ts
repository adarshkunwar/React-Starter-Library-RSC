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

  const commands = {
    npm: ["npm", ["create", "vite@latest", name, "--- --template", "react-ts"]],
    yarn: ["yarn", ["create", "vite", name, "--- --template", "react-ts"]],
    pnpm: ["pnpm", ["create", "vite", name, "--- --template", "react-ts"]],
  } as const;

  const [cmd, args] = commands[installation_method] ?? [];
  if (!cmd) throw new Error(`${installation_method} not supported`);

  const child = spawn(cmd, args, {
    shell: true,
    stdio: "inherit",
    env: { ...process.env, CI: "true" },
  });

  await new Promise((resolve, reject) =>
    child.on("close", (code) =>
      code === 0 ? resolve(true) : reject(new Error(`${cmd} failed`))
    )
  );
};

export { reactStarter };
