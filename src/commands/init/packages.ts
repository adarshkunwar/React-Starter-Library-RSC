import { mkdir, writeFile } from "node:fs/promises";
import { config } from "../../constant/config.js";
import { PACKAGES } from "../../constant/packages.js";
import type { TPackage } from "../../types/packaged.js";
import type { ProjectAnswers } from "../../types/questionList.js";
import { installAndLog } from "../../utils/commands/installCommand.js";
import { Logger } from "../../utils/helper/logger.js";
import { existsSync } from "node:fs";
import { dirname } from "node:path";

const CreateConfig = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  try {
    const cfg = config({ projectAnswers });
    const base = `${projectAnswers.name}`;

    for (const [path, content] of Object.entries(cfg)) {
      const filePath = `${base}/${content.location}`;
      const dir = dirname(filePath);

      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }

      await writeFile(
        filePath,
        typeof content.value === "function" ? content.value() : content.value
      );
      Logger.success(`📁 ${content.description} created successfully`);
    }

    Logger.success("📁 Config files created successfully");
  } catch (error) {
    Logger.error("❌ Failed to create config files", error);
    throw error;
  }
};

const InstallPackages = async ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  try {
    for (const pkg of Object.values<TPackage>(PACKAGES)) {
      if (pkg.packages.length > 0) {
        await installAndLog({ pkg: pkg, projectAnswers });
      } else {
        await installAndLog({ pkg: pkg, projectAnswers });
      }
    }
    Logger.success("All packages installed successfully");
  } catch (error) {
    Logger.error("Failed to install packages", error);
    throw error;
  }
};

export { CreateConfig, InstallPackages };
