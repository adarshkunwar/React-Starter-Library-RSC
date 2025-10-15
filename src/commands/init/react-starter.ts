import { hasCommand } from "../../utils/commands/hasCommand.js";
import type { ProjectAnswers } from "../../types/questionList.js";

const reactStarter = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  if (!(await hasCommand(projectAnswers.installation_method))) {
    console.error(`${projectAnswers.installation_method} is not installed`);
    process.exit(1);
  }

  console.log(
    "you have the projectAnswers installation method",
    projectAnswers.installation_method
  );

  // const child = spawn("npm", ["create", "vite@latest", projectName]);
  // child.stdout.on("data", (data) => {
  //   console.log(data.toString());
  // });
};

export { reactStarter };
