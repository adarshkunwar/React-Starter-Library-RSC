import { viteConfig } from "../files/viteConfig.js";
import type { ProjectAnswers } from "../types/questionList.js";
import { prettierIgnore, prettierRC } from "../files/prettier.js";
import { eslintConfig } from "../files/eslintConfig.js";
import { reactStoreConfig } from "../files/reactStoreConfig.js";
import { axiosConfig } from "../files/axiosConfig.js";
import { indexCSS } from "../files/indexcss.js";
import { encryptedLocalStorage } from "../files/encryptedLocalStorage.js";
import { tokenSlice } from "../files/tokenSlice.js";
import { declarationdts } from "../files/declarationd.js";
import { mainPage } from "../files/main.js";
import { envConfig } from "../files/env.js";
import { tsConfig } from "../files/tsConfig.js";
import { tsConfigApp } from "../files/tsConfigApp.js";
import { storeTs } from "../files/store.js";

export const config = ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  return {
    viteConfig: {
      name: "viteConfig",
      value: viteConfig(projectAnswers),
      description: "Vite Config",
      location: "vite.config.ts",
    },
    indexCSS: {
      name: "indexCSS",
      value: indexCSS,
      description: "Index CSS",
      location: "src/index.css",
    },
    prettierIgnore: {
      name: "prettierIgnore",
      value: prettierIgnore,
      description: "Prettier Ignore",
      location: ".prettierignore",
    },
    prettierRC: {
      name: "prettierRC",
      value: prettierRC,
      description: "Prettier RC",
      location: ".prettierrc",
    },
    eslintConfig: {
      name: "eslintConfig",
      value: eslintConfig,
      description: "Eslint Config",
      location: ".eslintrc.json",
    },
    reactStoreConfig: {
      name: "reactStoreConfig",
      value: reactStoreConfig,
      description: "React Store Config",
      location: "src/store/index.ts",
    },
    axiosConfig: {
      name: "axiosConfig",
      value: axiosConfig,
      description: "Axios Config",
      location: "src/config/axios.ts",
    },
    encryptedLocalStorage: {
      name: "encryptedLocalStorage",
      value: encryptedLocalStorage,
      description: "Encrypted Local Storage",
      location: "src/utils/encryptedLocalStorage.ts",
    },
    tokenSlice: {
      name: "tokenSlice",
      value: tokenSlice,
      description: "Token Slice",
      location: "src/config/store/authSlice.ts",
    },
    storeTs: {
      name: "storeTs",
      value: storeTs,
      description: "Store TS",
      location: "src/config/store.ts",
    },
    declarationdts: {
      name: "declarationdts",
      value: declarationdts,
      description: "Declaration DTS",
      location: "src/types/declaration.d.ts",
    },
    mainPage: {
      name: "mainPage",
      value: mainPage,
      description: "Main Page",
      location: "src/main.tsx",
    },
    envConfig: {
      name: "envConfig",
      value: envConfig,
      description: "Env Config",
      location: ".env",
    },
    tsConfig: {
      name: "tsConfig",
      value: tsConfig,
      description: "TS Config",
      location: "tsconfig.json",
    },
    tsConfigApp: {
      name: "tsConfigApp",
      value: tsConfigApp,
      description: "TS Config App",
      location: "tsconfig.app.json",
    },
  };
};
