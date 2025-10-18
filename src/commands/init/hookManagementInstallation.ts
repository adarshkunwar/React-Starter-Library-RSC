import { installPackage } from "../../utils/commands/installCommand.js";
import { Logger } from "../../utils/helper/logger.js";
import type { ProjectAnswers } from "../../types/questionList.js";
import { config } from "../../constant/config.js";
import { writeFile } from "node:fs/promises";

export const installHookManagementPackages = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  try {
    await installPackage({
      packageName:
        "axios @tanstack/react-query react-redux @reduxjs/toolkit react-hot-toast crypto-js react-router-dom",
      isDev: true,
      projectAnswers,
    });
    Logger.success("Hook management packages installed successfully");
  } catch (error) {
    Logger.error("Failed to install linter and formatter packages");
    throw error;
  }
};

export const fixAxiosAndHookManagementPackages = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  try {
    await writeFile(
      `${projectAnswers.name}/src/utils/encryptedLocalStorage.ts`,
      config({ projectAnswers }).encryptedLocalStorage
    );

    await writeFile(
      `${projectAnswers.name}/src/config/store/authSlice.ts`,
      config({ projectAnswers }).tokenSlice
    );

    await writeFile(
      `${projectAnswers.name}/src/config/store.ts`,
      config({ projectAnswers }).reactStoreConfig
    );

    await writeFile(
      `${projectAnswers.name}/src/config/axios.ts`,
      config({ projectAnswers }).axiosConfig
    );

    await writeFile(
      `${projectAnswers.name}/src/types/declaration.d.ts`,
      config({ projectAnswers }).declarationdts
    );

    await writeFile(
      `${projectAnswers.name}/src/main.tsx`,
      config({ projectAnswers }).mainPage
    );

    Logger.success("Axios and hook management packages installed successfully");
  } catch (error) {
    Logger.error("Failed to install Axios and hook management packages");
    throw error;
  }
};
