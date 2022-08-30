import express from "express";
import UserController from "../controllers/UserController.js";
import UserPrivilegeController from "../controllers/User_PrivilegeController.js";
import isToken from "../middlewares/isToken.js";

const router = express.Router();

router.post("/", UserController.register);
router.post("/login", UserController.login);
router.get("/me", UserController.getMyInformation);
router.get("/", isToken, UserController.getAllUser);
router.delete("/", isToken, UserController.deleteUser);
router.put("/", isToken, UserController.updateUser);
router.get("/detail", isToken, UserController.getDetailUser);
router.post("/privilege", isToken, UserPrivilegeController.handlePrivilege);

export default router;
