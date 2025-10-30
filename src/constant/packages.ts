import type { TPackage } from "../types/packaged.ts";

const PACKAGES: Record<string, TPackage> = {
  tailwind: {
    name: "tailwind",
    packages: ["tailwindcss", "@tailwindcss/vite"],
    isDevTool: false,
    description: "Tailwind CSS",
  },

  tailwindMergeAndClsx: {
    name: "tailwindMergeAndClsx",
    packages: ["tailwind-merge", "clsx"],
    isDevTool: false,
    description: "Tailwind Merge and Clsx",
  },

  linterAndFormatter: {
    name: "linterAndFormatter",
    packages: [
      "@eslint/js",
      "eslint-plugin-react",
      "eslint-plugin-react-hooks",
      "eslint-plugin-prettier",
      "eslint-config-prettier",
      "eslint-import-resolver-typescript",
      "eslint-plugin-import-x",
    ],
    isDevTool: false,
    description: "Linter and Formatter",
  },

  axios: {
    name: "axios",
    packages: ["axios"],
    isDevTool: false,
    description: "Axios",
  },

  reactQuery: {
    name: "reactQuery",
    packages: ["@tanstack/react-query"],
    isDevTool: false,
    description: "React Query",
  },

  reactRouter: {
    name: "reactRouter",
    packages: ["react-router-dom"],
    isDevTool: false,
    description: "React Router",
  },

  reactRedux: {
    name: "reactRedux",
    packages: ["@reduxjs/toolkit", "react-redux"],
    isDevTool: false,
    description: "React Redux",
  },

  prettier: {
    name: "prettier",
    packages: ["prettier"],
    isDevTool: false,
    description: "Prettier",
  },

  typescript: {
    name: "typescript",
    packages: ["typescript"],
    isDevTool: false,
    description: "Typescript",
  },
  reactHotToast: {
    name: "sonner",
    packages: ["sonner"],
    isDevTool: false,
    description: "React Hot Toast",
  },

  cryptoJs: {
    name: "cryptoJs",
    packages: ["crypto-js"],
    isDevTool: false,
    description: "Crypto Js",
  },

  reactRouterDom: {
    name: "reactRouterDom",
    packages: ["react-router-dom"],
    isDevTool: false,
    description: "React Router Dom",
  },

  reactIcons: {
    name: "reactIcons",
    packages: ["react-icons"],
    isDevTool: false,
    description: "React Icons",
  },

  tanstackReactTable: {
    name: "tanstackReactTable",
    packages: ["@tanstack/react-table"],
    isDevTool: false,
    description: "Tanstack React Table",
  },

  reactHookForm: {
    name: "reactHookForm",
    packages: ["react-hook-form"],
    isDevTool: false,
    description: "React Hook Form",
  },
};

export { PACKAGES };
