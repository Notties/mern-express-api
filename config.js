import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), `.env`),
});

export default {
  PORT: process.env.PORT || 4000,
  DB_CONFIG: {
    uri: process.env.DB_URI,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
};
 