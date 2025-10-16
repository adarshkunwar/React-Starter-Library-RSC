import type { ProjectAnswers } from "../../types/questionList.js";
import { Logger } from "../../utils/helper/logger.js";
import { writeFile } from "node:fs/promises";

const createConfig = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}): Promise<void> => {
  try {
    await writeFile(
      `${projectAnswers.name}/rsc.config.json`,
      JSON.stringify(projectAnswers, null, 2),
      "utf8"
    );
    Logger.success("Config created successfully");
  } catch (error) {
    console.error("Something went wrong:", error);
    process.exit(1);
  }
};

export { createConfig };
