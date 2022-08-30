import express from "express";
import UniversityController from "../controllers/UniversityController.js";
import isToken from "../middlewares/isToken.js";

const router = express.Router();

// GET /api/university
router.get("/", UniversityController.getAll);

// POST /api/university
router.post("/", isToken, UniversityController.addUniversity);

// PUT /api/university/:id
router.put("/:id", isToken, UniversityController.updateUniversity);

// DELETE /api/university
router.delete("/:id", isToken, UniversityController.deleteUniversity);

export default router;
