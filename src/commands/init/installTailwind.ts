import { writeFile } from "node:fs/promises";
import { installPackage } from "../../utils/commands/installCommand.js";
import { config } from "../../constant/config.js";
import type { ProjectAnswers } from "../../types/questionList.js";
import { Logger } from "../../utils/helper/logger.js";

const installTailwindCSS = async (projectAnswers: ProjectAnswers) => {
  await installPackage({
    packageName: "tailwindcss @tailwindcss/vite",
    isDev: true,
    projectAnswers,
  });
};

const fixViteConfig = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  try {
    await writeFile(`${projectAnswers.name}/vite.config.ts`, config.viteConfig);
    Logger.success("Tailwind CSS config fixed successfully");
  } catch (error) {
    console.error("Something went wrong:", error);
    process.exit(1);
  }
};

export { installTailwindCSS, fixViteConfig };
