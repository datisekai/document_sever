import Years from "../models/Years.js";

const YearController = {
  getAll: async (req, res) => {
    try {
      const data = await Years.find();
      return res.json({ success: true, data });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, xin vui lòng chờ!",
      });
    }
  },
  addYear: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("year:create")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const data = req.body;

    if (!data.name)
      return res
        .status(400)
        .json({ success: false, message: "Thiếu tham số tên năm học!" });

    try {
      const newYears = new Years({ ...data });
      await newYears.save();
      return res.json({ success: true, newYears });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, xin vui lòng chờ!",
      });
    }
  },
  updateYear: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("year:update")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const id = req.params.id;
    const data = req.body;

    try {
      const isUpdateSuccess = await Years.findOneAndUpdate(
        { _id: id },
        { ...data }
      );

      if (!isUpdateSuccess) {
        return res.status(400).json({
          success: false,
          message: "Cập nhật thất bại, vui lòng thử lại",
        });
      }

      return res.json({ success: true, data });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, xin vui lòng chờ!",
      });
    }
  },
  deleteYear: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("year:delete")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const id = req.params.id;

    try {
      const isDeleteSuccess = await Years.findOneAndUpdate(
        { _id: id },
        { status: 0 }
      );

      if (!isDeleteSuccess) {
        return res.status(400).json({
          success: false,
          message: "Cập nhật thất bại, vui lòng thử lại",
        });
      }

      return res.json({ success: true, message: "Xóa thành công!" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, xin vui lòng chờ!",
      });
    }
  },
};

export default YearController;
