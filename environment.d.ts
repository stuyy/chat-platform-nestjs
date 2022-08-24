declare namespace NodeJS {
  export interface ProcessEnv {
    MYSQL_DB_HOST?: string;
    MYSQL_DB_NAME?: string;
    MYSQL_DB_PORT?: string;
    MYSQL_DB_PASSWORD?: string;
    MYSQL_DB_USERNAME?: string;
    COOKIE_SECRET: string;
  }
}
