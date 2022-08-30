import Feedbacks from "../models/Feedbacks.js";

const FeedbackControlller = {
  addFeedback: async (req, res) => {
    const { content } = req.body;
    try {
      const newFeedback = new Feedbacks({ content });
      await newFeedback.save();
      return res.json({ success: true, data: newFeedback });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  deleteFeedback: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("feedback:delete")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const _id = req.query._id;
    if (!_id) {
      return res
        .status(404)
        .json({ success: true, message: "Vui lòng nhập đầy đủ" });
    }

    try {
      const currentFeedback = await Feedbacks.findOneAndUpdate(
        { _id },
        { status: 0 }
      );
      if (!currentFeedback) {
        return res
          .status(404)
          .json({ success: false, message: "Feedback không tồn tại" });
      }

      return res.json({ success: true, data: currentFeedback });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  getAllFeedback: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("feedback:getAll")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    try {
      const feedbacks = await Feedbacks.find().sort("-createdAt");
      return res.json({ success: true, data: feedbacks });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
};

export default FeedbackControlller;
