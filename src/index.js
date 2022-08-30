import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./utils/connectDB.js";
import UserRoute from "./routers/UserRoute.js";
import UniversityRoute from "./routers/UniversityRoute.js";
import SubjectsRoute from "./routers/SubjectRoute.js";
import YearsRoute from "./routers/YearsRoute.js";
import ExamsRoute from "./routers/ExamsRoute.js";

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
app.use("/api/university", UniversityRoute);
app.use("/api/subjects", SubjectsRoute);
app.use("/api/years", YearsRoute);
app.use("/api/exam", ExamsRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.PORT}`);
});
