import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./utils/connectDB.js";
import UserRoute from "./routers/UserRoute.js";

dotenv.config();

connectDB();

const app = express();

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hell from server!");
});

app.use("/api/user", UserRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.PORT}`);
});
