/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENDPOINT: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_DATABASE_ID: string;
  readonly VITE_COLLECTION_ID: string;
  readonly VITE_APP_OPTIONS_ABUSE:string;
  readonly VITE_COLLECTION_ID:string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
