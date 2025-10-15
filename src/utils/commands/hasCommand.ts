import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

export const hasCommand = async (command: string): Promise<boolean> => {
  try {
    await execAsync(`${command} --version`);
    return true;
  } catch (error) {
    return false;
  }
};
