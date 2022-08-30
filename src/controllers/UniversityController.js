import University from "../models/University.js";

const UniversityController = {
  getAll: async (req, res) => {
    try {
      const university = await University.find();
      return res.json({ success: true, university });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  addUniversity: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("university:create")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const data = req.body;

    if (!data.name || !data.uni)
      return res.status(400).json({
        success: false,
        message: "Thiếu tham số tên trường và mã trường!",
      });

    try {
      const newUniversity = new University({ ...data });
      await newUniversity.save();
      return res.json({ success: true, newUniversity });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  updateUniversity: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("university:update")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const data = req.body;
    const id = req.params?.id;

    try {
      const updatedUniversity = await University.findOneAndUpdate(
        { _id: id },
        {
          ...data,
        }
      );

      if (!updatedUniversity) {
        return res.status(400).json({
          success: false,
          message: "Cập nhật thất bại, vui lòng thử lại!",
        });
      }

      return res.json({ success: true, updatedUniversity: data });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  deleteUniversity: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("university:delete")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const id = req.params?.id;

    try {
      const deteleUniversity = await University.findOneAndUpdate(
        { _id: id },
        {
          status: 0,
        }
      );

      if (!deteleUniversity) {
        return res.status(400).json({
          success: false,
          message: "Xóa thất bại, vui lòng thử lại",
        });
      }

      return res.json({ success: true, deteleUniversity });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
};

export default UniversityController;
