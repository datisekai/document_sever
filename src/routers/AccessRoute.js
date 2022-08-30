import express from "express";
import AccessController from "../controllers/AccessController.js";

const router = express.Router();

router.get("/", AccessController.increaseAccess);

export default router;
