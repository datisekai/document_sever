import Subjects from "../models/Subjects.js";

const SubjectsController = {
  addSubject: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("subject:create")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const data = req.body;

    if (!data.sub || !data.name || !data.uni_id)
      return res.status(400).json({
        success: false,
        message: "Thiếu tham số mã môn học, tên môn học, chuyên ngành",
      });

    try {
      const newSubject = new Subjects({ ...data });
      await newSubject.save();
      return res.json({ success: true, newSubject });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  updateSubject: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("subject:update")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const data = req.body;
    const id = req.params.id;

    try {
      const isUpdateSuccess = await Subjects.findOneAndUpdate(
        { _id: id },
        { ...data }
      );

      if (!isUpdateSuccess) {
        return res.status(400).json({
          success: false,
          message: "Cập nhật thất bại, vui lòng thử lại!",
        });
      }

      return res.json({ success: true, data });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  deleteSubjects: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("subject:delete")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const id = req.params.id;

    try {
      const isDeleteSuccess = await Subjects.findOneAndUpdate(
        { _id: id },
        { status: 0 }
      );

      if (!isDeleteSuccess) {
        return res.status(400).json({
          success: false,
          message: "Xóa thất bại, vui lòng thử lại!",
          data: isDeleteSuccess,
        });
      }

      return res.json({ success: true, message: "Xóa thành công" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  getSubjectWithDepartment: async (req, res) => {
    const dep_id = req.query?.dep_id;

    try {
      const subjectsResults = await Subjects.find({ dep_id });
      return res.json({ success: true, data: subjectsResults });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  searchSubject: async (req, res) => {
    const q = req.query?.q;
    if (!q.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu từ khóa tìm kiếm!" });
    }
    try {
      const textReg = new RegExp(q, "i");
      const results = await Subjects.find({ name: textReg });
      return res.json({ success: true, results });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
};

export default SubjectsController;
