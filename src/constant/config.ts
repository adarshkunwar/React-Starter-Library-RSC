import { viteConfig } from "../files/viteConfig.js";
import type { ProjectAnswers } from "../types/questionList.js";
import { prettierIgnore, prettierRC } from "../files/prettier.js";
import { eslintConfig } from "../files/eslintConfig.js";
import { authSlice } from "../files/src/config/store/authSlice.js";
import { storeTs } from "../files/src/config/store.js";
import { axios } from "../files/src/config/axios.js";
import { indexCSS } from "../files/src/appcss.js";
import { EncryptedLocalStorage } from "../files/src/utils/encryptedLocalStorage.js";
import { declarationDTS } from "../files/src/types/declarationd.js";
import { main } from "../files/src/main.js";
import { envConfig } from "../files/env.js";
import { tsConfig } from "../files/tsConfig.js";
import { tsConfigApp } from "../files/tsConfigApp.js";
import { Icon } from "../files/src/assets/icons/icon.js";
import { Header } from "../files/src/components/layout/Header.js";
import { Layout } from "../files/src/components/layout/Layout.js";
import { Page } from "../files/src/components/ui/Page.js";
import { Table } from "../files/src/components/ui/Table.js";
import { Typography } from "../files/src/components/ui/Typography.js";
import { TextField } from "../files/src/components/ui/TextField.js";
import { protectedRoutes } from "../files/src/config/routes/protectedRoutes.js";
import { routes } from "../files/src/config/routes/route.js";
import { routesList } from "../files/src/config/routes/routesList.js";
import { TableData } from "../files/src/features/home/components/TableData.js";
import { Title } from "../files/src/features/home/components/Title.js";
import { dataConst } from "../files/src/features/home/constant/dataConst.js";
import { tableDataConst } from "../files/src/features/home/constant/tableDataConst.js";
import { Home } from "../files/src/features/home/index.js";
import { routeType } from "../files/src/types/route.js";
import { app } from "../files/src/app.js";
import { FolderTableRow } from "../files/src/features/home/type/FolderTableRow.js";
import { Spin } from "../files/src/assets/icons/svgs/spin.js";
import { Classname } from "../files/src/lib/classname.js";
import { Page404 } from "../files/src/components/layout/Page404.js";
import { Timer } from "../files/src/components/modules/Timer.js";
import { Button } from "../files/src/components/ui/Buttont.js";
import { Dropdown } from "../files/src/components/ui/Dropdown.js";
import { Modal } from "../files/src/components/ui/Modal.js";
import { Shimmer } from "../files/src/components/ui/Shimmer.js";
import { Tabs } from "../files/src/components/ui/Tabs.js";

export const config = ({
  projectAnswers,
}: {
  projectAnswers: ProjectAnswers;
}) => {
  return {
    icons: {
      name: "icons",
      value: Icon,
      description: "Icons",
      location: "src/assets/icons/Icon.tsx",
    },

    componentsLayoutHeader: {
      name: "componentsLayoutHeader",
      value: Header,
      description: "Components Layout Header",
      location: "src/components/layout/Header.tsx",
    },
    componentsLayoutLayout: {
      name: "componentsLayoutLayout",
      value: Layout,
      description: "Components Layout Layout",
      location: "src/components/layout/Layout.tsx",
    },

    componentsUIPage: {
      name: "componentsUIPage",
      value: Page,
      description: "Components UI Page",
      location: "src/components/ui/Page.tsx",
    },
    componentsUITable: {
      name: "componentsUITable",
      value: Table,
      description: "Components UI Table",
      location: "src/components/ui/Table.tsx",
    },
    componentsUIInput: {
      name: "componentsUIInput",
      value: TextField,
      description: "Components UI Input",
      location: "src/components/ui/TextField.tsx",
    },
    componentsUITypography: {
      name: "componentsUITypography",
      value: Typography,
      description: "Components UI Typography",
      location: "src/components/ui/Typography.tsx",
    },
    componentsUITimer: {
      name: "componentsUITimer",
      value: Timer,
      description: "Components UI Timer",
      location: "src/components/modules/Timer.tsx",
    },
    componentsUIButton: {
      name: "componentsUIButton",
      value: Button,
      description: "Components UI Button",
      location: "src/components/ui/Button.tsx",
    },
    componentsUIModal: {
      name: "componentsUIModal",
      value: Modal,
      description: "Components UI Modal",
      location: "src/components/ui/Modal.tsx",
    },
    componentsUIDropdown: {
      name: "componentsUIDropdown",
      value: Dropdown,
      description: "Components UI Dropdown",
      location: "src/components/ui/Dropdown.tsx",
    },
    componentsUIShimmer: {
      name: "componentsUIShimmer",
      value: Shimmer,
      description: "Components UI Shimer",
      location: "src/components/ui/Shimmer.tsx",
    },
    componentsUITabs: {
      name: "componentsUITabs",
      value: Tabs,
      description: "Components UI Tabs",
      location: "src/components/ui/Tabs.tsx",
    },

    configRoutesProtectedRoute: {
      name: "configRoutesProtectedRoute",
      value: protectedRoutes,
      description: "Config Routes Protected Route",
      location: "src/config/routes/ProtectedRoutes.tsx",
    },
    configRoutesRoute: {
      name: "configRoutesProtectedRoute",
      value: routes,
      description: "Config Routes Route",
      location: "src/config/routes/Route.tsx",
    },
    configRoutesRoutesList: {
      name: "configRoutesProtectedRoute",
      value: routesList,
      description: "Config Routes Routes List",
      location: "src/config/routes/RoutesList.tsx",
    },

    configStoreAuthSlice: {
      name: "configStoreAuthSlice",
      value: authSlice,
      description: "Config Store Auth Slice",
      location: "src/config/store/AuthSlice.ts",
    },

    configAxios: {
      name: "configAxios",
      value: axios,
      description: "Config Axios",
      location: "src/config/Axios.ts",
    },
    configStore: {
      name: "configStore",
      value: storeTs,
      description: "Config Store",
      location: "src/config/Store.ts",
    },

    featuresHomeComponentTableData: {
      name: "featuresHomeComponents",
      value: TableData,
      description: "Features Home Component Table Data",
      location: "src/features/home/components/TableData.tsx",
    },
    featuresHomeComponentTitle: {
      name: "featuresHomeComponentTitle",
      value: Title,
      description: "Features Home Component Title",
      location: "src/features/home/components/Title.tsx",
    },

    featuresHomeConstantDataConst: {
      name: "featuresHomeConstantDataConst",
      value: dataConst,
      description: "Features Home Constant Data Const",
      location: "src/features/home/constant/data.const.ts",
    },
    featuresHomeConstantTableDataConst: {
      name: "featuresHomeConstantTableDataConst",
      value: tableDataConst,
      description: "Features Home Constant Table Data Const",
      location: "src/features/home/constant/tableData.const.ts",
    },

    featuresHomeTypeFolderTableRow: {
      name: "featuresHomeTypeFolderTableRow",
      value: FolderTableRow,
      description: "Features Home Type Folder Table Row",
      location: "src/features/home/type/FolderTableRow.d.ts",
    },

    featureHomeIndex: {
      name: "featureHomeIndex",
      value: Home,
      description: "Feature Home Index",
      location: "src/features/home/index.tsx",
    },

    typeDeclarationdts: {
      name: "typeDeclarationdts",
      value: declarationDTS,
      description: "Type Declaration DTS",
      location: "src/types/Declaration.d.ts",
    },
    typeRouteType: {
      name: "typeRouteType",
      value: routeType,
      description: "Type Route Type",
      location: "src/types/Route.d.ts",
    },

    utilsEncryptedLocalStorage: {
      name: "utilsEncryptedLocalStorage",
      value: EncryptedLocalStorage,
      description: "Utils Encrypted Local Storage",
      location: "src/utils/EncryptedLocalStorage.ts",
    },

    srcAppCSS: {
      name: "srcAppCSS",
      value: indexCSS,
      description: "Src App CSS",
      location: "src/App.css",
    },
    srcMainTSX: {
      name: "srcMainTSX",
      value: main,
      description: "Src Main TSX",
      location: "src/Main.tsx",
    },
    srcAppTSX: {
      name: "srcAppTSX",
      value: app,
      description: "Src App TSX",
      location: "src/App.tsx",
    },

    viteConfig: {
      name: "viteConfig",
      value: viteConfig(projectAnswers),
      description: "Vite Config",
      location: "vite.config.ts",
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
    assetsIconsSVGS: {
      name: "assetsIconsSVGS",
      value: Spin,
      description: "Assets Icons SVGS",
      location: "src/assets/icons/svgs/spin.svg",
    },
    libClassname: {
      name: "libClassname",
      value: Classname,
      description: "Lib Classname",
      location: "src/lib/classname.ts",
    },
    page404: {
      name: "Page404",
      value: Page404,
      description: "Page 404",
      location: "src/components/layout/Page404.tsx",
    },
  };
};
