import express from "express";
import DepartmentController from "../controllers/DepartmentController.js";
import isToken from "../middlewares/isToken.js";
const router = express.Router();

router.get("/get-department/with-uni", DepartmentController.getDepartment);
router.get("/:id", DepartmentController.getDepartmentDetail);
router.get("/", DepartmentController.getDepartments);
router.post("/", isToken, DepartmentController.addDepartment);
router.put("/:_id", isToken, DepartmentController.updateDepartment);
router.delete("/", isToken, DepartmentController.deleteDepartment);

export default router;
