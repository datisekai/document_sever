import express from "express";
import SliderController from "../controllers/SliderController.js";
import isToken from "../middlewares/isToken.js";

const router = express.Router();

router.get("/", SliderController.getAllSlider);
router.get("/:id", SliderController.getSliderDetails);
router.post("/", isToken, SliderController.addSlider);
router.delete("/", isToken, SliderController.deleteSlider);
router.put("/", isToken, SliderController.updateSlider);

export default router;
