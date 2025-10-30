import type { InstallationMethod } from "../types/questionList.js";

export const COMMANDS = {
  INIT: "init",
};

// -----------------
export const PROJECT_STRUCTURE_OPTIONS = [
  "feature-folder",
  "monorepo",
] as const;

export const INSTALLATION_METHOD_OPTIONS = ["npm", "yarn", "pnpm"] as const;

export const STYLING_LIBRARY_OPTIONS = [
  "tailwindcss",
  "css-modules",
  "styled-components",
] as const;

// -----------------

export const INSTALL_COMMANDS: Record<InstallationMethod, [string, string[]]> =
  {
    npm: ["npm", ["install"]],
    yarn: ["yarn", ["install"]],
    pnpm: ["pnpm", ["install"]],
  };
