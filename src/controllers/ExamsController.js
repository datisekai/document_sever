import Exams from "../models/Exams.js";
import slugify from "slugify";
import SubjectsModels from "../models/Subjects.js";

const ExamsController = {
  addExams: async (req, res) => {
    const data = req.body;

    if (!data.term || !data.year || !data.sub_id || !data.title)
      return res
        .status(400)
        .json({ success: false, message: "Thiếu tham số!" });

    try {
      const newExams = new Exams({ ...data, slug: slugify(data.name) });
      await newExams.save();
      return res.json({ success: true, newExams });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  updateExams: async (req, res) => {
    const id = req.query?.id;
    const data = req.body;

    try {
      const isUpdateSuccess = await Exams.findOneAndUpdate(
        { _id: id },
        { ...data }
      );

      if (!isUpdateSuccess) {
        return res.status(400).json({
          success: false,
          message: "Cập nhật thất bại, vui lòng thử lại!",
        });
      }

      return res.json({
        success: true,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  getAllExams: async (req, res) => {
    try {
      const data = await Exams.find();
      return res.json({ success: true, data });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  getExamsHavePaginate: async (req, res) => {
    const limit = +req.query?.limit || 4;
    const page = +req.query?.page || 1;
    const skip = (page - 1) * limit;

    try {
      const results = await Promise.all(
        Exams.countDocuments(),
        Exams.find()
          .limit(limit)
          .skip(skip)
          .populate("users")
          .populate("years")
          .sort("-updatedAt")
      );
      const total = results[0];
      const data = results[1];
      return res.json({
        success: true,
        data,
        totalPage: Math.ceil(total / limit),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  deleteExams: async (req, res) => {
    const id = req.query?.id;

    try {
      const isDeleteSuccess = await Exams.findOneAndUpdate(
        { _id: id },
        { status: 0 }
      );

      if (!isDeleteSuccess) {
        return res.status(400).json({
          success: false,
          message: "Xóa thất bại, vui lòng thử lại!",
        });
      }

      return res.json({
        success: true,
        message: "Xóa thành công!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  getExam: async (req, res) => {
    const slug = req.params.slug;

    try {
      const exam = await Exams.findOne({ slug });
      return res.json({ success: true, exam });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  getExamWithYears: async (req, res) => {
    const year = req.query.year_id;

    try {
      const data = await Exams.find({ year });
      return res.json({ success: true, data });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  getExamWithUniversity: async (req, res) => {
    const uni_id = req.query?.uni_id;

    try {
      const subjects = await SubjectsModels.find({ uni_id });
      const results = await Exams.find({
        sub_id: { $in: subjects.map((item) => item._id) },
      });
      return res.json({ success: true, results });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  getExamWithSubjects: async (req, res) => {
    const sub_id = req.query?.sub_id;

    try {
      const results = await Exams.find({ sub_id });
      return res.json({ success: true, results });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  getMyExam: async (req, res) => {
    const user_id = req.query?.user_id;

    try {
      const results = await Exams.find({ user_id });
      return res.json({ success: true, results });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  searchExam: async (req, res) => {
    const q = req.query?.q;

    if (!q.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu từ khóa tìm kiếm!" });
    }

    try {
      const textReg = new RegExp(q, "i");
      const results = await Exams.find({ title: textReg });
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

export default ExamsController;
