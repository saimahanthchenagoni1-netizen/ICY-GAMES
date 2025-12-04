import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  // Use a relative base by default so the site works when deployed to GitHub Pages
  // You can override by setting VITE_BASE in env (e.g. "/repo-name/")
  const base = env.VITE_BASE || './';

  return {
    base,
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});