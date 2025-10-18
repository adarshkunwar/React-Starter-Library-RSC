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

export const config = ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  return {
    viteConfig: viteConfig(projectAnswers),
    indexCSS,
    prettierIgnore,
    prettierRC,
    eslintConfig,
    reactStoreConfig,
    axiosConfig,
    encryptedLocalStorage,
    tokenSlice,
    declarationdts,
    mainPage,
    envConfig,
  };
};

export const addConfigPath = {
  tsConfigPath: {
    key: "compilerOptions",
    value: {
      baseUrl: ".",
      paths: {
        "@/*": ["./src/*"],
        "@components/*": ["./src/components/*"],
        "@ui/*": ["./src/components/ui/*"],
        "@module/*": ["./src/components/module/*"],
        "@layout/*": ["./src/components/layout/*"],
        "@utils/*": ["./src/utils/*"],
        "@hooks/*": ["./src/hooks/*"],
        "@services/*": ["./src/services/*"],
        "@types/*": ["./src/types/*"],
        "@pages/*": ["./src/pages/*"],
        "@features/*": ["./src/features/*"],
        "@config/*": ["./src/config/*"],
      },
    },
  },

  tsConfigAppJson: {
    key: "compilerOptions",
    value: {
      baseUrl: ".",
      paths: {
        "@/*": ["./src/*"],
        "@components/*": ["./src/components/*"],
        "@ui/*": ["./src/components/ui/*"],
        "@module/*": ["./src/components/module/*"],
        "@layout/*": ["./src/components/layout/*"],
        "@utils/*": ["./src/utils/*"],
        "@hooks/*": ["./src/hooks/*"],
        "@services/*": ["./src/services/*"],
        "@types/*": ["./src/types/*"],
        "@pages/*": ["./src/pages/*"],
        "@features/*": ["./src/features/*"],
        "@config/*": ["./src/config/*"],
      },
    },
  },
} as const;
