import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import tsconfig from './tsconfig.json';

const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const aliases: Record<string, string> = {};

  Object.entries(paths || {}).forEach(([alias, targetPaths]) => {
    const aliasPath = targetPaths[0]
      .replace(/\/\*$/, '')
      .replace(/^\/*/, '');

    aliases[alias] = path.join(SRC_PATH, aliasPath);
  });

  return aliases;
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
});