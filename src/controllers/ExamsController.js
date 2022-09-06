import Exams from "../models/Exams.js";
import slugify from "slugify";
import SubjectsModels from "../models/Subjects.js";
import Department from "../models/Department.js";

const ExamsController = {
  addExams: async (req, res) => {
    const data = req.body;

    if (!data.term || !data.year || !data.sub_id || !data.title)
      return res
        .status(400)
        .json({ success: false, message: "Thiếu tham số!" });

    try {
      const newExams = new Exams({
        ...data,
        slug: slugify(data.name.toLowerCase()),
      });
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
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("exam:update")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
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
        data: isUpdateSuccess,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  updateMyExam: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("exam:myUpdate")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const id = req.query?.id;
    const user_id = req.user_id;
    const data = req.body;

    try {
      const currentExam = await Exams.findById(id);
      if (!currentExam || currentExam?.user_id !== user_id) {
        return res
          .status(404)
          .json({ success: false, message: "Bạn không có quyền truy cập" });
      }
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
        data: isUpdateSuccess,
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
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("exam:delete")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
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
  deleteMyExam: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("exam:myDelete")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const id = req.query?.id;
    const user_id = req.user_id;

    try {
      const currentExam = await Exams.findById(id);
      if (!currentExam || currentExam?.user_id !== user_id) {
        return res
          .status(404)
          .json({ success: false, message: "Bạn không có quyền truy cập" });
      }
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
        data: isDeleteSuccess,
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
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("exam:myGet")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
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
    const {
      text,
      uni_id,
      sub_id,
      dep_id,
      year_id,
      page = 1,
      limit = 10,
    } = req.query;
    const skip = (page - 1) * limit;

    if (!text.trim() && !uni_id && !sub_id && !year_id && !dep_id) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }

    try {
      //Text

      if (text) {
        if (!uni_id && !sub_id && !year_id && !dep_id) {
          const textReg = new RegExp(text, "i");
          const results = await Exams.find({ title: textReg, status: true })
            .skip(skip)
            .limit(limit)
            .sort("-createdAt");
          return res.json({ success: true, data: results });
        }

        if (uni_id && !sub_id && !year_id && !dep_id) {
          const textReg = new RegExp(text, "i");
          const deps = await Department.find({ uni_id });
          const subList = deps._doc.map((item) => item._id);
          const results = await Exams.find({
            title: textReg,
            sub_id: {
              $in: subList,
            },
          })
            .skip(skip)
            .limit(limit)
            .sort("-createdAt");
          return res.json({ success: true, data: results });
        }

        if (uni_id && !sub_id && !year_id && dep_id) {
          const textReg = new RegExp(text, "i");
          const subs = await SubjectsModels.find({ dep_id });
          const subList = subs._doc.map((item) => item._id);
          const results = await Exams.find({
            title: textReg,
            sub_id: {
              $in: subList,
            },
          })
            .skip(skip)
            .limit(limit)
            .sort("-createdAt");
          return res.json({ success: true, data: results });
        }

        if (uni_id && sub_id && year_id && dep_id) {
          const textReg = new RegExp(text, "i");
          const results = await Exams.find({
            title: textReg,
            sub_id,
            year_id,
          })
            .skip(skip)
            .limit(limit)
            .sort("-createdAt");
          return res.json({ success: true, data: results });
        }
      } else {
        if (!sub_id && !year_id && !dep_id) {
          const deps = await Department.find({ uni_id });
          const subList = deps._doc.map((item) => item._id);
          const results = await Exams.find({
            sub_id: {
              $in: subList,
            },
          })
            .skip(skip)
            .limit(limit)
            .sort("-createdAt");
          return res.json({ success: true, data: results });
        }

        if (!sub_id && !year_id && dep_id) {
          const subs = await SubjectsModels.find({ dep_id });
          const subList = subs._doc.map((item) => item._id);
          const results = await Exams.find({
            sub_id: {
              $in: subList,
            },
          })
            .skip(skip)
            .limit(limit)
            .sort("-createdAt");
          return res.json({ success: true, data: results });
        }

        if (sub_id && !year_id && dep_id) {
          const results = await Exams.find({
            sub_id,
          })
            .skip(skip)
            .limit(limit)
            .sort("-createdAt");
          return res.json({ success: true, data: results });
        }

        if (sub_id && year_id && dep_id) {
          const results = await Exams.find({
            sub_id,
            year_id,
          })
            .skip(skip)
            .limit(limit)
            .sort("-createdAt");
          return res.json({ success: true, data: results });
        }
      }
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
