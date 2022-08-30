import PrivilegeGroup from "../models/PrivilegeGroup.js";

const PrivilegeGroupController = {
  addPriGroup: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("privilege_group:create")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const { name, position, status = 1, slug, parentId = null } = req.body;
    if (!name || !position || !slug) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }

    try {
      const newPriGroup = new PrivilegeGroup({
        name,
        position,
        status,
        slug,
        parentId,
      });

      await newPriGroup.save();

      return res.json({ success: true, data: newPriGroup });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  updatePriGroup: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("privilege_group:update")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const { name, position, status, slug, parentId, _id } = req.body;
    if (!_id) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }
    try {
      const currentPriGroup = await PrivilegeGroup.findOneAndUpdate(
        { _id },
        { name, position, status, slug, parentId, _id }
      );
      if (!currentPriGroup) {
        return res
          .status(404)
          .json({ success: false, message: "Privilege group không tồn tại" });
      }

      return res.json({ success: true, data: currentPriGroup });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  deletePriGroup: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("privilege_group:delete")) {
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
      const currentPriGroup = await PrivilegeGroup.findOneAndUpdate(
        { _id },
        { status: 0 }
      );
      if (!currentPriGroup) {
        return res
          .status(404)
          .json({ success: false, message: "Privilege group không tồn tại" });
      }

      return res.json({ success: true, data: currentPriGroup });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  getAllPriGroup: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("privilege_group:getAll")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    try {
      const privilegeGroups = await PrivilegeGroup.find().sort("position");
      return res.json({ success: true, data: privilegeGroups });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
};

export default PrivilegeGroupController;
