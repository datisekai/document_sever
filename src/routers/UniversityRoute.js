import express from "express";
import UniversityController from "../controllers/UniversityController.js";

const router = express.Router();

// GET /api/university
router.get("/", UniversityController.getAll);

// POST /api/university
router.post("/", UniversityController.addUniversity);

// PUT /api/university/:id
router.put("/:id", UniversityController.updateUniversity);

// DELETE /api/university
router.delete("/:id", UniversityController.deleteUniversity);

export default router;
