import Saves from "../models/Saves.js";

const SaveController = {
  addSave: async (req, res) => {
    const { exam_id, user_id } = req.body;
    if (!exam_id || !user_id) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }

    try {
      const newSave = new Saves({
        user_id,
        exam_id,
      });
      await newSave.save();

      return res.json({ success: true, data: newSave });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  deleteSave: async (req, res) => {
    const _id = req.query._id;
    const user_id = req.user_id;
    if (!_id) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }

    try {
      const currentSave = await Saves.findById(_id);
      if (!currentSave) {
        return res
          .status(404)
          .json({ success: false, message: "Tài liệu không tồn tại" });
      }

      if (currentSave.user_id !== user_id) {
        return res
          .status(404)
          .json({ success: false, message: "Bạn không có quyền truy cập" });
      }

      const saveDelete = await Saves.findOneAndDelete({ _id });
      return res.json({ success: true, data: saveDelete });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  getSaveByUser: async (req, res) => {
    const user_id = req.user_id;
    const page = req.query.page || 1;
    const perpage = req.query.perpage || 4;
    const start = (page - 1) * perpage;
    try {
      const savesList = await Promise.all(
        Saves.countDocuments({ user_id }),
        Saves.find({ user_id }).sort("-createdAt").limit(perpage).skip(start)
      );
      return res.json({ success: true, data: savesList });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
};

export default SaveController;
