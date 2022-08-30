import express from "express";
import PrivilegeGroupController from "../controllers/Privilege_groupController.js";
import isToken from "../middlewares/isToken.js";

const router = express.Router();

router.get("/", isToken, PrivilegeGroupController.getAllPriGroup);
router.post("/", isToken, PrivilegeGroupController.addPriGroup);
router.put("/", isToken, PrivilegeGroupController.updatePriGroup);
router.delete("/", isToken, PrivilegeGroupController.deletePriGroup);

export default router;
