import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./src/utils/connectDB.js";
import UserRoute from "./src/routers/UserRoute.js";
import PrivilegeGroupRoute from "./src/routers/PrivilegeGroupRoute.js";
import PrivilegeRoute from "./src/routers/PrivilegeRoute.js";
import AccessRoute from "./src/routers/AccessRoute.js";
import SliderRoute from "./src/routers/SliderRoute.js";
import FeedbackRoute from "./src/routers/FeedbackRoute.js";
import UniversityRoute from "./src/routers/UniversityRoute.js";
import SubjectsRoute from "./src/routers/SubjectRoute.js";
import YearsRoute from "./src/routers/YearsRoute.js";
import ExamsRoute from "./src/routers/ExamsRoute.js";
import SaveRoute from "./src/routers/SaveRoute.js";
import DepartmentRoute from "./src/routers/DepartmentRoute.js";
import CommentRoute from "./src/routers/CommentRoute.js";

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
app.use("/api/privilege-group", PrivilegeGroupRoute);
app.use("/api/privilege", PrivilegeRoute);
app.use("/api/access", AccessRoute);
app.use("/api/slider", SliderRoute);
app.use("/api/feedback", FeedbackRoute);
app.use("/api/university", UniversityRoute);
app.use("/api/subjects", SubjectsRoute);
app.use("/api/years", YearsRoute);
app.use("/api/exam", ExamsRoute);
app.use("/api/comment", CommentRoute);
app.use("/api/save", SaveRoute);
app.use("/api/department", DepartmentRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.PORT}`);
});
