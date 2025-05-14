import dotenv from "dotenv";
import path from "path";

export const loadEnv = (): void => {
    if (process.env.NODE_ENV !== "production") {
        const envPath = path.resolve(process.cwd(), ".env");
        const result = dotenv.config({ path: envPath });

        if (result.error) {
            console.error("Failed to load .env:", result.error);
            throw result.error;
        }
    }
};
loadEnv();