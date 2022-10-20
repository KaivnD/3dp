import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), process.env.NODE_ENV === "production" && dts()],
  define: { "process.env.NODE_ENV": `'${process.env.NODE_ENV}'` },
  ...(process.env.NODE_ENV === "production"
    ? {
        build: {
          lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "tridp",
            fileName: "tridp",
            formats: ["cjs", "es", "umd", 'iife'],
          },
          minify: true,
        },
      }
    : {}),
});
