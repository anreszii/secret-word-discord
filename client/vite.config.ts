import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  envDir: ".",
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "/socket": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/socket/, ""),
      },
    },
  },
});
