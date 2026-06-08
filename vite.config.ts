import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  preview: {
    allowedHosts: [
      'alex-0d18-test-22-717e35-bp4af.sprites.app',
      'alex-0d18-test-22-717e35-bp4af.mctai.app',
    ],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
