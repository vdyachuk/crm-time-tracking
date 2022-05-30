import * as dotenv from 'dotenv';

dotenv.config();

export const configuration = {
    port: parseInt(process.env.PORT, 10) || 3003,
    services: {
        movieServer: {
            host: process.env.SERVER_URL
        },
        fileMs: {
            host: process.env.FILE_MS_HOST,
            port: parseInt(process.env.FILE_MS_PORT, 10) || 3007
        }
    }
};
