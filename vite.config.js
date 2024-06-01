import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // Dev config
    return {
      plugins: [react()]
    };
  } else {
    // Prod config
    return {
      base: '/gittop/',
      plugins: [react()]
    };
  }
});