import { mkdir as mkdirPromises } from "node:fs/promises";
import type { PathLike } from "node:fs";

const createFolder = async ({
  path,
  createFolder,
}: {
  path: string;
  createFolder: string;
}) => {
  try {
    await mkdirPromises(`${path}/${createFolder}` as PathLike, {
      recursive: true,
      mode: 0o755,
    });
  } catch (error) {
    console.error("Something went wrong:", error);
  }
};

export { createFolder };
