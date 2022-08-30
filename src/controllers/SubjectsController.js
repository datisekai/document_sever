import Subjects from "../models/Subjects.js";

const SubjectsController = {
  addSubject: async (req, res) => {
    const data = req.body;

    if (!data.sub || !data.name || !data.uni_id)
      return res.status(400).json({
        success: false,
        message: "Thiếu tham số mã môn học, tên môn học, trường đại học",
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
  getSubjectWithUniversity: async (req, res) => {
    const universityId = req.query?.uni_id;

    try {
      const subjectsResults = await Subjects.find({ uni_id: universityId });
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
