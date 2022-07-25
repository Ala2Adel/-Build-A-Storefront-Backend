import { Pool } from 'pg';
import dotenv from 'dotenv';

// initializes the environment variables
dotenv.config();

// the actual connection to the db

const client: Pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  database:
    process.env.ENV === "dev" ? process.env.DB_NAME : process.env.DB_NAME_TEST
});

export default client;