import express from "express";
import mysql from "mysql";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.PORT}`);
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Datisekai");
});
