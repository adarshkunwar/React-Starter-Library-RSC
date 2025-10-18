import { writeFile } from "node:fs/promises";
import { installPackage } from "../../utils/commands/installCommand.js";
import { config } from "../../constant/config.js";
import type { ProjectAnswers } from "../../types/questionList.js";
import { Logger } from "../../utils/helper/logger.js";

const installTailwindCSS = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  try {
    await installPackage({
      packageName: "tailwindcss @tailwindcss/vite",
      isDev: true,
      projectAnswers,
    });

    await writeFile(`${projectAnswers.name}/src/index.css`, config.indexCSS);
  } catch (error) {
    Logger.error("Failed to install Tailwind CSS");
    throw error; // Re-throw to be caught by the caller
  }
};

const installLinterAndFormatter = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  try {
    await installPackage({
      packageName:
        "@eslint/js eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-prettier eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import-x",
      isDev: true,
      projectAnswers,
    });
  } catch (error) {
    Logger.error("Failed to install linter and formatter packages");
    throw error;
  }
};

const fixViteConfig = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  try {
    await writeFile(`${projectAnswers.name}/vite.config.ts`, config.viteConfig);
    Logger.success("Vite config updated successfully");
  } catch (error) {
    Logger.error("Failed to update Vite config");
    throw error;
  }
};

const installEslintConfig = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  try {
    await writeFile(
      `${projectAnswers.name}/eslint.config.js`,
      config.eslintConfig
    );
    await writeFile(`${projectAnswers.name}/.prettierrc`, config.prettierRC);
    await writeFile(
      `${projectAnswers.name}/.prettierignore`,
      config.prettierIgnore
    );
    Logger.success("Config files created successfully");
  } catch (error) {
    Logger.error("Failed to create config files");
    throw error;
  }
};

export {
  installTailwindCSS,
  fixViteConfig,
  installLinterAndFormatter,
  installEslintConfig,
};
