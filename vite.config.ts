import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["src/App.tsx", "src/main.tsx"],
      tsconfigPath: "./tsconfig.build.json",
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "bxp-code",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      // Externalize peer dependencies and heavy dependencies
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "shiki",
        "prettier",
        "prettier/standalone",
        "prettier/plugins/babel",
        "prettier/plugins/typescript",
        "prettier/plugins/html",
        "prettier/plugins/postcss",
        "prettier/plugins/markdown",
        "prettier/plugins/estree",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
    sourcemap: true,
    minify: "esbuild",
  },
});
