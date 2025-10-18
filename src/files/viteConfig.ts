import type { ProjectAnswers } from "../types/questionList.js";

export const viteConfig = (proejctAnswer: ProjectAnswers) => {
  const { project_structure } = proejctAnswer;

  return `

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
      '@types': path.resolve(__dirname, './src/types'),
      '@config': path.resolve(__dirname, './src/config'),
      ${
        project_structure === "feature-folder"
          ? `
        '@features': path.resolve(__dirname, './src/features'),
        '@features/components': path.resolve(__dirname, './src/features/components'),
        '@features/hooks': path.resolve(__dirname, './src/features/hooks'),
        '@features/store': path.resolve(__dirname, './src/features/store'),
      `
          : `
        '@pages': path.resolve(__dirname, './src/pages'),
        '@pages/home': path.resolve(__dirname, './src/pages/home'),
        '@pages/dashboard': path.resolve(__dirname, './src/pages/dashboard'),
      `
      }
    },
  },
})

`;
};
