/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />
/// <reference types="vitest" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}
