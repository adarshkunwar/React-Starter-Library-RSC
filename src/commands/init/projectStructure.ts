import {
  classicFolderStructure,
  featureFolderStructure,
} from "../../constant/folderStructure.js";
import type { ProjectAnswers } from "../../types/questionList.js";
import { createFolder } from "../../utils/commands/createFolder.js";
import { Logger } from "../../utils/helper/logger.js";

const getFolderStructure = (structure: string): string[] => {
  return structure === "feature-folder"
    ? featureFolderStructure
    : classicFolderStructure;
};

const createProjectFolders = async (
  basePath: string,
  folders: string[]
): Promise<void> => {
  for (const folder of folders) {
    await createFolder({ path: basePath, createFolder: folder });
    Logger.success(`${folder} folder created successfully`);
  }
};

export const projectStartup = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}): Promise<void> => {
  try {
    Logger.info("🚀 Creating project startup...");

    const folderStructure = getFolderStructure(
      projectAnswers.project_structure
    );
    const basePath = `${projectAnswers.name}/src`;

    await createProjectFolders(basePath, folderStructure);

    Logger.success("Project startup completed successfully");
  } catch (error) {
    Logger.error("Failed to create project startup", error);
    throw error;
  }
};
