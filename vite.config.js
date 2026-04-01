import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],

  server: {
    host: "127.0.0.1",
    port: 5173,
    proxy: {
      "/wilayah-api": {
        target: "https://wilayah.id/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wilayah-api/, ""),
      },
    },
  },
});
