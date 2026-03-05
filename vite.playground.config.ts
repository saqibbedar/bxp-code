/**
 * Playground Vite config — separate from the library build (vite.config.ts).
 *
 * The playground is the interactive demo app that showcases the library.
 * It builds into "dist-playground" so it never conflicts with the
 * library output in "dist".
 *
 * Scripts (package.json):
 *   playground:build   — production build
 *   playground:preview — locally preview the production build
 * 
 * Run "npm run playground:build" to build the playground, and then
 * "npm run playground:preview" to preview the production build locally.
 * The preview server will run on http://localhost:4174 by default.
 * 
 * Note: The playground is not meant for development. For development, run
 * "npm run dev" to start the Vite dev server, which serves the library
 * source code directly from "src" and supports hot module replacement (HMR).
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist-playground",
    emptyOutDir: true,
  },
});
