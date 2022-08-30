import express from "express";
import SubjectsController from "../controllers/SubjectsController.js";
import isToken from "../middlewares/isToken.js";

const router = express.Router();

// GET /api/subjects/:uni_id
router.get("/", SubjectsController.getSubjectWithUniversity);

// POST /api/subjects
router.post("/", isToken, SubjectsController.addSubject);

// PUT /api/subjects
router.put("/:id", isToken, SubjectsController.updateSubject);

// DELETE /api/subjects
router.delete("/:id", isToken, SubjectsController.deleteSubjects);

// GET /api/subjects/search
// query {
//   q: Từ khóa
// }
router.get("/search", SubjectsController.searchSubject);

export default router;
