import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const APP_URL = process.env.APP_URL;
export const DB_NAME = process.env.DB_NAME;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
