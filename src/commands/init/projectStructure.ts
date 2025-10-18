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

const createEnvFile = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}): Promise<void> => {
  await writeFile(
    `${projectAnswers.name}/.env`,
    config({ projectAnswers }).envConfig
  );
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
    await createEnvFile({ projectAnswers });

    Logger.success("Project startup completed successfully");
  } catch (error) {
    Logger.error("Failed to create project startup", error);
    throw error;
  }
};

interface ConfigTarget {
  file: string;
  config: { value: any };
}

const updateConfigFile = async (
  basePath: string,
  target: ConfigTarget
): Promise<void> => {
  const filePath = `${basePath}/${target.file}`;

  try {
    const jsonFile = await readFile(filePath, "utf8");
    const json = await jsonCparser({ jsonFile });

    json.compilerOptions = {
      ...(json.compilerOptions ?? {}),
      ...target.config.value,
      paths: {
        ...(json.compilerOptions?.paths ?? {}),
        ...(target.config.value.paths ?? {}),
      },
    };

    await writeFile(filePath, JSON.stringify(json, null, 2), "utf8");
    Logger.success(`${target.file} updated successfully`);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      Logger.warn(`Skipped ${target.file} (not found)`);
    } else {
      throw err;
    }
  }
};

export const editConfigPath = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}): Promise<void> => {
  try {
    const basePath = projectAnswers.name;
    Logger.info("🔧 Editing config path...");

    const targets: ConfigTarget[] = [
      { file: "tsconfig.json", config: addConfigPath.tsConfigPath },
      { file: "tsconfig.app.json", config: addConfigPath.tsConfigAppJson },
    ];

    for (const target of targets) {
      await updateConfigFile(basePath, target);
    }
    Logger.success("Config path edited successfully");
  } catch (error) {
    Logger.error("Failed to edit config path", error);
    throw error;
  }
};
