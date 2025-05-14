import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');

export const loadEnv = (): void => {
    const result = dotenv.config({ path: envPath });

    if (result.error) {
        console.error('Failed to load .env:', result.error);
        throw result.error;
    }
};
loadEnv();