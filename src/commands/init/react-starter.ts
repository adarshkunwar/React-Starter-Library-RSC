import { spawn } from "node:child_process";

const reactStarter = async () => {
  const child = spawn("npm", ["create", "vite@latest"]);
  child.stdout.on("data", (data) => {
    console.log(data.toString());
  });
};

export { reactStarter };
