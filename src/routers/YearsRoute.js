import express from "express";
import YearController from "../controllers/YearsController.js";
import isToken from "../middlewares/isToken.js";

const router = express.Router();

// GET /api/years
router.get("/", YearController.getAll);

// POST /api/years
router.post("/", isToken, YearController.addYear);

// PUT /api/years/:id
router.put("/:id", isToken, YearController.updateYear);

// DELETE /api/years/:id
router.delete("/:id", isToken, YearController.deleteYear);

export default router;
