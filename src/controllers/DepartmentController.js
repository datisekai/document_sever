import Department from "../models/Department.js";

const DepartmentController = {
  addDepartment: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("department:create")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const { dep, name, uni_id } = req.body;
    if (!name || !uni_id) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }

    try {
      const newDepartment = new Department({
        dep,
        name,
        uni_id,
      });

      await newDepartment.save();
      return res.json({ success: true, data: newDepartment });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  updateDepartment: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("department:update")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const _id = req.params._id;
    if (!_id) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }
    try {
      const data = req.body;
      const currentDep = await Department.findOneAndUpdate(
        { _id },
        { ...data }
      );
      if (!currentDep) {
        return res
          .status(404)
          .json({ success: false, message: "Ngành này không tồn tại" });
      }
      return res.json({ success: true, data: currentDep });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  deleteDepartment: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("department:delete")) {
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
      const currentDep = await Department.findOneAndUpdate(
        { _id },
        { status: false }
      );
      if (!currentDep) {
        return res
          .status(404)
          .json({ success: false, message: "Ngành này không tồn tại" });
      }
      return res.json({ success: true, data: currentDep });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  getDepartment: async (req, res) => {
    const uni_id = req.query.uni_id;
    if (!uni_id) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }

    try {
      const departments = await Department.find({ uni_id, status: true }).sort(
        "-createdAt"
      );
      return res.json({ success: true, data: departments });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  getDepartments: async (req, res) => {
    try {
      const departments = await Department.find().populate("uni_id");
      return res.json({ success: true, data: departments });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
  getDepartmentDetail: async (req, res) => {
    if (!req.params.id) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }
    try {
      const department = await Department.findOne({ _id: req.params.id });
      res.json({ success: true, data: department });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server đang gặp lỗi, vui lòng chờ!",
      });
    }
  },
};

export default DepartmentController;
