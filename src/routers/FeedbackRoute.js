import express from "express";
import FeedbackControlller from "../controllers/FeedbackController.js";
import isToken from "../middlewares/isToken.js";

const router = express.Router();

router.post("/", FeedbackControlller.addFeedback);
router.delete("/", isToken, FeedbackControlller.deleteFeedback);
router.get("/", isToken, FeedbackControlller.getAllFeedback);

export default router;
