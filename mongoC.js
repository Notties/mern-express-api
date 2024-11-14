import { MongoClient } from "mongodb";

import config from "./config.js";

const connectionString = config.DB_CONFIG.uri;

const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
  console.log("connection successful");
} catch (e) {
  console.error(e);
}
let db = conn.db(`${config.DB_CONFIG.name}`);
export default db;