/**
 * Simple environment configuration helper with TypeScript support
 * Provides direct property access to environment variables
 */

export const env = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,

  // Built-in Vite variables with fallbacks
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
} as const;

export default env;
