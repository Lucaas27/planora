import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import mkcert from "vite-plugin-mkcert";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    server: {
        port: 3000
    },
    plugins: [react(), mkcert()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src/")
        }
    }
});
