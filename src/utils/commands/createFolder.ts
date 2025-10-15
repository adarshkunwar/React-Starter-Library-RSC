import { mkdir as mkdirPromises } from "node:fs/promises";
import type { PathLike } from "node:fs";

const mkdir = async (path: string) => {
  try {
    await mkdirPromises(path as PathLike, { recursive: true });
  } catch (error) {
    console.error("Something went wrong:", error);
  }
};

export { mkdir };
