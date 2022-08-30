import express from "express";
import ExamsController from "../controllers/ExamsController";

const router = express.Router();

// POST /api/exams
router.post("/", ExamsController.addExams);

// PUT /api/exams query id
router.put("/", ExamsController.updateExams);

// DELETE /api/exams query id
router.delete("/", ExamsController.deleteExams);

// GET /api/exams/get_all
router.get("/get_all", ExamsController.getAllExams);

// GET /api/exams query page, limit
router.get("/", ExamsController.getExamsHavePaginate);

// GET /api/exams/year query year
router.get("/year", ExamsController.getExamWithYears);

// GET /api/exams/university query uni_id
router.get("/university", ExamsController.getExamWithUniversity);

// GET /api/exams/subjects query sub_id
router.get("/subject", ExamsController.getExamWithSubjects);

// GET /api/exams/me query user_id
router.get("/me", ExamsController.getMyExam);

// GET /api/exams/search query q
router.get("/search", ExamsController.searchExam);

// GET /api/exams/:slug
router.get("/:slug", ExamsController.getExam);

export default router;
