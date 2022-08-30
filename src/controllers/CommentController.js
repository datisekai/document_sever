import Comments from "../models/Comments.js";

const CommentController = {
  addComment: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("comment:create")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const user_id = req.user_id;
    const { exam_id, content } = req.body;
    if (!exam_id || !content) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }

    try {
      const newComment = new Comments({
        user_id,
        exam_id,
        content,
      });
      await newComment.save();

      return res.json({ success: true, data: newComment });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  deleteMyComment: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("comment:myDelete")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const _id = req.query._id;
    const user_id = req.user_id;
    if (!_id) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }

    try {
      const currentComment = await Comments.findById(_id);
      if (!currentComment) {
        return res
          .status(404)
          .json({ success: false, message: "Bình luận không tồn tại" });
      }

      if (currentComment.user_id !== user_id) {
        return res
          .status(404)
          .json({ success: false, message: "Bạn không có quyền truy cập" });
      }

      const commentDelete = await Comments.findOneAndUpdate(
        { _id },
        { status: 0 }
      );
      return res.json({ success: true, data: commentDelete });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  deleteComment: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("comment:delete")) {
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
      const currentComment = await Comments.findOneAndUpdate(
        { _id },
        { status: 0 }
      );
      if (!currentComment) {
        return res
          .status(404)
          .json({ success: false, message: "Bình luận không tồn tại" });
      }
      return res.json({ success: true, data: currentComment });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  updateMyComment: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("comment:myUpdate")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const _id = req.query._id;
    const { content } = req.body;
    const user_id = req.user_id;
    if (!_id || !content) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }

    try {
      const currentComment = await Comments.findById(_id);
      if (!currentComment) {
        return res
          .status(404)
          .json({ success: false, message: "Bình luận không tồn tại" });
      }

      if (currentComment.user_id !== user_id) {
        return res
          .status(404)
          .json({ success: false, message: "Bạn không có quyền truy cập" });
      }

      const commentUpdate = await Comments.findOneAndUpdate(
        { _id },
        { content }
      );
      return res.json({ success: true, data: commentUpdate });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  getCommentByExam: async (req, res) => {
    const exam_id = req.query.exam_id;
    if (!_id) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }
    try {
      const listComment = await Comments.find({ exam_id }).sort("-createdAt");
      return res.json({ success: true, data: listComment });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  getMyComment: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("comment:myGet")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const user_id = req.user_id;

    try {
      const listComment = await Comments.find({ user_id }).sort("-createdAt");

      return res.json({ success: true, data: listComment });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
};

export default CommentController;
