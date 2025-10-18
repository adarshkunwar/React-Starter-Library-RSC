const viteConfig = `
import path from 'path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@module': path.resolve(__dirname, './src/components/module'),
      '@layout': path.resolve(__dirname, './src/components/layout'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@types': path.resolve(__dirname, './src/types'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@features': path.resolve(__dirname, './src/features'),
      '@config': path.resolve(__dirname, './src/config'),
    },
  },
})
`;

const indexCSS = ` @import "tailwindcss";`;

const prettierIgnore = `
dist*
node_modules
docs
routeTree.gen.ts 
`;

const prettierRC = `
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 120,
  "htmlWhitespaceSensitivity": "ignore"
}
`;

const eslintConfig = `
// @ts-check

import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import { flatConfigs as ImportXFlatConfigs } from 'eslint-plugin-import-x'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default defineConfig(
  {
    ignores: ['node_modules/', 'dist/', 'build/', 'docs' ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  ImportXFlatConfigs.recommended,
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect', 
      },
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: './tsconfig.json',
        }),
      ],
    },
    rules: {
      'import-x/first': 'error',
      'import-x/order': ['error', { alphabetize: { order: 'asc' }, 'newlines-between': 'always' }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
)
`;

const reactStoreConfig = `
import {configureStore} from '@reduxjs/toolkit'
import authSlice from '@/config/store/authSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
`;
const axiosConfig = `
 import axios, {type AxiosError } from 'axios'
import {store} from '@/config/store'

export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || '',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
})

// Request interceptor
AxiosInstance.interceptors.request.use(
  (config: any) => {
    const state = store.getState().auth
    const {accessToken, guestToken} = state

    if (accessToken) {
      config.headers.Authorization = \`Bearer \${accessToken}\`
    } else if (guestToken) {
      config.headers.Authorization = \`Bearer \${guestToken}\`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)
   

`;
const encryptedLocalStorage = `
import CryptoJS from 'crypto-js';
export const encryptedLocalStorage = {
  getItem(key: string): string | null {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      
      const bytes = CryptoJS.AES.decrypt(encrypted, import.meta.env.VITE_SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error(\`Decryption error for \${key}:\`, error);
      return null;
    }
  },

  setItem(key: string, value: string): void {
    try {
      const encrypted = CryptoJS.AES.encrypt(value, import.meta.env.VITE_SECRET_KEY).toString();
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error(\`Encryption error for \${key}:\`, error);
    }
  },

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
};

`;
const authSlice = `
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { encryptedLocalStorage } from '@/utils/encryptedLocalStorage';
interface AuthState {
  accessToken: string | null;
  guestToken: string | null;
  isAuthenticated: boolean;
  user_id: string | null;
}

const initialState: AuthState = {
  accessToken: encryptedLocalStorage.getItem('accessToken') ?? null,
  guestToken: encryptedLocalStorage.getItem('guestToken') ?? null,
  isAuthenticated: encryptedLocalStorage.getItem('isAuthenticated') ? true : false,
  user_id: JSON.parse(encryptedLocalStorage.getItem('user_id') as string),
  // user_id:  "3a1a510e-b3e7-ea61-d8d1-0b2ae21fcd1a",

};

const TokenSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (
      state,
      action: PayloadAction<{
        accessToken?: string | null;
        guestToken?: string | null;
        isAuthenticated: boolean;
        user_id?: string | null;
      }>
    ) => {
      const { accessToken, guestToken, isAuthenticated, user_id } = action.payload;
      if (accessToken !== undefined) {
        state.accessToken = accessToken;
        encryptedLocalStorage.setItem("accessToken", accessToken || '');
      }
      
      if (guestToken !== undefined) {
        state.guestToken = guestToken;
        encryptedLocalStorage.setItem("guestToken", guestToken || '');
      }
      
      if (isAuthenticated !== undefined) {
        state.isAuthenticated = isAuthenticated;
        encryptedLocalStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
      }
      if (user_id !== undefined) {
        state.user_id = user_id;
        encryptedLocalStorage.setItem("user_id", JSON.stringify(user_id));
      }
    },
    clearAuthToken: (state) => {
      state.accessToken = null;
      state.guestToken = null;
      state.user_id = null;
      state.isAuthenticated = false;
      
      try {
        encryptedLocalStorage.removeItem("accessToken");
        encryptedLocalStorage.removeItem("guestToken");
        localStorage.removeItem("isAuthenticated");
        localStorage.clear()
        

      } catch (error) {
        console.error("Failed to clear localStorage:", error);
      }
    }
  },
});

export const { setAuthToken, clearAuthToken } = TokenSlice.actions;
export default TokenSlice.reducer;
`;
const declarationdts = ` 
declare module 'crypto-js';
`;

const mainPage = `
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import {Provider} from 'react-redux'
import {store} from '@/config/store'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryDelay: 300,
      refetchOnWindowFocus: false,
    },
  },
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Toaster 
            position="top-right"
            reverseOrder={false} /> 
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
)

`;

const envConfig = `
VITE_APP_API_URL=http://localhost:3000
VITE_SECRET_KEY=your-secret-key
`;

export const config = {
  viteConfig,
  indexCSS,
  prettierIgnore,
  prettierRC,
  eslintConfig,
  reactStoreConfig,
  axiosConfig,
  encryptedLocalStorage,
  authSlice,
  declarationdts,
  mainPage,
  envConfig,
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
