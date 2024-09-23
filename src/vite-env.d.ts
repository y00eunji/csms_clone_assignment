/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CSMS_ID: string;
  readonly VITE_CSMS_PASSWORD: string;
  readonly VITE_CSMS_SERVICE_TYPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
