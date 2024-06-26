declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;

    NGROK_WEBHOOK_SECRET: string;
    CLERK_WEBHOOK_SECRET: string;

    TURSO_AUTH_TOKEN: string;
    TURSO_DATABASE_URL: string;
  }
}
