export type DatabaseConfig = {
    isDocumentDatabase: boolean;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    synchronize?: boolean;
    maxConnections: number;
    sslEnabled?: boolean;
};
