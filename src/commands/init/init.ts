import { mkdir } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { questionsList } from "./questionsList.js";
import type { PathLike } from "node:fs";

const init = async () => {
  // create a readline interface -> this can be used to read the input from the user
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // ask the user for the name of the project
  try {
    const name = await readline.question(
      questionsList[0]?.message
        ? questionsList[0]?.message + ": "
        : "Project name: "
    );

    // create the project folder
    console.log(`Creating project "${name}"...`);
    await mkdir(name as PathLike, { recursive: true });

    console.log(`Project folder "${name}" created successfully.`);
  } catch (error) {
    console.error("Error creating project:", error);
  } finally {
    readline.close();
  }
};

export { init };
