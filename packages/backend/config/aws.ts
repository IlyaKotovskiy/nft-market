import { S3Client } from '@aws-sdk/client-s3';
import { loadEnv } from '../utils/getEnv.js';

loadEnv();

export const s3 = new S3Client({
    region: 'ru-7',
    endpoint: 'https://s3.ru-7.storage.selcloud.ru',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    },
    forcePathStyle: true,
});