import express from "express";
import SaveController from "../controllers/SaveController.js";
import isToken from "../middlewares/isToken.js";

const router = express.Router();

router.get("/me", isToken, SaveController.getSaveByUser);
router.post("/", isToken, SaveController.addSave);
router.delete("/", isToken, SaveController.deleteSave);

export default router;
