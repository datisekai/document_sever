import Sliders from "../models/Sliders.js";

const SliderController = {
  addSlider: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("slider:create")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const { image, url } = req.body;
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }

    try {
      const newSlider = new Sliders({
        image,
        url,
      });
      await newSlider.save();

      return res.json({ success: true, data: newSlider });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  updateSlider: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("slider:update")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const { _id, image, url } = req.body;

    if (!_id) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }
    try {
      const currentSlider = await Sliders.findOneAndUpdate(
        { _id },
        { image, url }
      );
      if (!currentSlider) {
        return res
          .status(404)
          .json({ success: false, message: "Slider không tồn tại" });
      }

      return res.json({ success: true, data: currentSlider });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  deleteSlider: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("slider:delete")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const _id = req.query._id;
    if (!_id) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }
    try {
      const currentSlider = await Sliders.findOneAndDelete({ _id });
      if (!currentSlider) {
        return res
          .status(404)
          .json({ success: false, message: "Slider không tồn tại" });
      }

      return res.json({ success: true, data: currentSlider });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  getAllSlider: async (req, res) => {
    try {
      const sliders = await Sliders.find().sort("-createdAt");
      return res.json({ success: true, data: sliders });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  getSliderDetails: async (req, res) => {
    try {
      const _id = req.params.id;
      if (!_id) {
        return res.status(400).json("Bạn thiếu tham số id");
      }
      const sliderDetails = await Sliders.findOne({ _id });
      res.json({ success: true, data: sliderDetails });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
};

export default SliderController;
