import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import react from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";
import mkcert from "vite-plugin-mkcert";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  envDir: "./src/environments",
  server: {
    port: 3000,
  },
  plugins: [react(), mkcert(), tailwindcss(), svgr({
    svgrOptions: {
      exportType: 'default',
      ref: true,
      svgo: true,
      titleProp: true,
      replaceAttrValues: {
        '#000': 'currentColor',
        '#000000': 'currentColor',
      }
    },
    include: "**/*.svg",
  })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
    },
  },
});
