import mysql from "mysql";
import * as dotenv from "dotenv";
dotenv.config();
const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql connected");
});

export default db;
