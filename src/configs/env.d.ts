declare namespace NodeJS{
    interface ProcessEnv{
        PORT: string,
        BASE_URL?: string,
        NODE_ENV? : string
    }
}