import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/users': {
        target: 'https://azure-node-app-aqcfgybya0e4d6e5.centralindia-01.azurewebsites.net',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
