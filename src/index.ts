import { argv } from "node:process";
import { COMMANDS } from "./constant/commands.js";
import { init } from "./commands/init/init.js";

const process = argv[2];

if (process === COMMANDS.INIT) {
  init();
} else {
  console.log("command not found");
}
