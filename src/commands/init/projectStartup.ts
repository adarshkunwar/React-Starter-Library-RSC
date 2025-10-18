import { readFile, writeFile } from "node:fs/promises";
import {
  classicFolderStructure,
  featureFolderStructure,
} from "../../constant/folderStructure.js";
import type { ProjectAnswers } from "../../types/questionList.js";
import { createFolder } from "../../utils/commands/createFolder.js";
import { Logger } from "../../utils/helper/logger.js";
import { addConfigPath, config } from "../../constant/config.js";
import { jsonCparser } from "../../utils/commands/jsonCparser.js";

export const projectStartup = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  try {
    Logger.info("� Creating project startup...");
    const folderStructure: string[] =
      projectAnswers.project_structure === "feature-folder"
        ? featureFolderStructure
        : classicFolderStructure;

    for (const folder of folderStructure) {
      await createFolder({
        path: `${projectAnswers.name}/src`,
        createFolder: folder,
      });
      Logger.success(`${folder} folder created successfully`);
    }

    await writeFile(`${projectAnswers.name}/.env`, config.envConfig);

    Logger.success("Project startup completed successfully ----");
  } catch (error) {
    Logger.error("Failed to create project startup");
    throw error;
  }
};

export const editConfigPath = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  try {
    const basePath = projectAnswers.name;
    Logger.info("� Editing config path...");
    const targets = [
      { file: "tsconfig.json", config: addConfigPath.tsConfigPath },
      { file: "tsconfig.app.json", config: addConfigPath.tsConfigAppJson },
    ];

    for (const { file, config } of targets) {
      const filePath = `${basePath}/${file}`;

      try {
        const jsonFile = await readFile(filePath, "utf8");
        const json = await jsonCparser({ jsonFile });

        // merge or add compilerOptions + paths
        json.compilerOptions = {
          ...(json.compilerOptions ?? {}),
          ...config.value,
          paths: {
            ...(json.compilerOptions?.paths ?? {}),
            ...(config.value.paths ?? {}),
          },
        };

        await writeFile(filePath, JSON.stringify(json, null, 2), "utf8");
        Logger.success(`${file} updated successfully`);
      } catch (err: any) {
        // Only warn if the file doesn’t exist
        if (err.code === "ENOENT") {
          console.warn(`⚠️  Skipped ${file} (not found)`);
          continue;
        }
        throw err;
      }
    }
  } catch (error) {
    console.error("❌ Failed to edit config path:", error);
  }
};
