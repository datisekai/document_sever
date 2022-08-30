import express from "express";
import SubjectsController from "../controllers/SubjectsController.js";

const router = express.Router();

// GET /api/subjects/:uni_id
router.get("/", SubjectsController.getSubjectWithUniversity);

// POST /api/subjects
router.post("/", SubjectsController.addSubject);

// PUT /api/subjects
router.put("/:id", SubjectsController.updateSubject);

// DELETE /api/subjects
router.delete("/:id", SubjectsController.deleteSubjects);

// GET /api/subjects/search
// query {
//   q: Từ khóa
// }
router.get("/search", SubjectsController.searchSubject);

export default router;
