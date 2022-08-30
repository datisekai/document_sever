import express from "express";
import YearController from "../controllers/YearsController.js";

const router = express.Router();

// GET /api/years
router.get("/", YearController.getAll);

// POST /api/years
router.post("/", YearController.addYear);

// PUT /api/years/:id
router.put("/:id", YearController.updateYear);

// DELETE /api/years/:id
router.delete("/:id", YearController.deleteYear);

export default router;
