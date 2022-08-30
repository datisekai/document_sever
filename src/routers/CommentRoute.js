import express from "express";
import CommentController from "../controllers/CommentController.js";
import isToken from "../middlewares/isToken.js";
const router = express.Router();

router.get("/", CommentController.getCommentByExam);
router.post("/", isToken, CommentController.addComment);
router.delete("/", isToken, CommentController.deleteComment);
router.get("/me", isToken, CommentController.getMyComment);
router.put("/me", isToken, CommentController.updateMyComment);
router.delete("/me", isToken, CommentController.deleteMyComment);

export default router;
