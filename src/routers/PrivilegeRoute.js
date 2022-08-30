import express from "express";
import PrivilegeController from "../controllers/PrivilegeController.js";
import isToken from "../middlewares/isToken.js";

const router = express.Router();

router.get("/", isToken, PrivilegeController.getAllPrivilege);
router.delete("/", isToken, PrivilegeController.deletePrivilege);
router.post("/", PrivilegeController.addPrivilege);
router.put("/", isToken, PrivilegeController.updatePrivilege);

export default router;
