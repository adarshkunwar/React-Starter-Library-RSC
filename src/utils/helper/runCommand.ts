import { spawn } from "node:child_process";

export const runCommand = async (
  command: string,
  args: string[],
  options: { cwd?: string; shell: boolean; stdio: "inherit" }
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, options);
    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
};
