import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./utils/connectDB.js";
import UserRoute from "./routers/UserRoute.js";
<<<<<<< HEAD
import PrivilegeGroupRoute from "./routers/PrivilegeGroupRoute.js";
import PrivilegeRoute from "./routers/PrivilegeRoute.js";
import AccessRoute from "./routers/AccessRoute.js";
import SliderRoute from "./routers/SliderRoute.js";
import FeedbackRoute from "./routers/FeedbackRoute.js";
=======
import UniversityRoute from "./routers/UniversityRoute.js";
import SubjectsRoute from "./routers/SubjectRoute.js";
import YearsRoute from "./routers/YearsRoute.js";
import ExamsRoute from "./routers/ExamsRoute.js";
>>>>>>> An

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
<<<<<<< HEAD
app.use("/api/privilege-group", PrivilegeGroupRoute);
app.use("/api/privilege", PrivilegeRoute);
app.use("/api/access", AccessRoute);
app.use("/api/slider", SliderRoute);
app.use("/api/feedback", FeedbackRoute);
=======
app.use("/api/university", UniversityRoute);
app.use("/api/subjects", SubjectsRoute);
app.use("/api/years", YearsRoute);
app.use("/api/exam", ExamsRoute);
>>>>>>> An

app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.PORT}`);
});
