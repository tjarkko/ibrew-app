export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AZURE_AD_CLIENT_ID: string
      AZURE_AD_CLIENT_SECRET: string
      AZURE_AD_TENANT_ID: string
      //ENV: 'test' | 'dev' | 'prod'
    }
  }
}
