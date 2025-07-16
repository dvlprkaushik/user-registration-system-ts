declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        BASE_URL?: string;
        NODE_ENV?: "development" | "production" | "test";
        DATA_PATH: string;
        RATE_LIMIT_WINDOW: number;  // must be string, convert to number when using
        RATE_LIMIT_MAX_REQUESTS: number; // must be string, convert to number when using
    }
}
