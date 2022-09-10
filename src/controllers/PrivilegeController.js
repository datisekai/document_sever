import Privilege from "../models/Privilege.js";
import PrivilegeGroup from "../models/PrivilegeGroup.js";

const PrivilegeController = {
  addPrivilege: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("privilege:create")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const { name, group_id, url_match, status = 1 } = req.body;
    if (!name || !group_id || !url_match) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }

    try {
      const newPrivilege = new Privilege({
        name,
        group_id,
        url_match,
        status,
      });
      await newPrivilege.save();

      return res.json({ success: true, data: newPrivilege });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  updatePrivilege: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("privilege:update")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const { name, group_id, url_match, status = 1, _id } = req.body;
    if (!_id) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }

    try {
      const currentPrivilege = await Privilege.findOneAndUpdate(
        { _id },
        { name, group_id, url_match, status }
      );
      if (!currentPrivilege) {
        return res
          .status(404)
          .json({ success: false, message: "Privilege không tồn tại" });
      }

      return res.json({ success: true, data: currentPrivilege });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  deletePrivilege: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("privilege:delete")) {
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
      const currentPrivilege = await Privilege.findOneAndUpdate(
        { _id },
        { status: 0 }
      );
      if (!currentPrivilege) {
        return res
          .status(404)
          .json({ success: false, message: "Privilege không tồn tại" });
      }

      return res.json({ success: true, data: currentPrivilege });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  getAllPrivilege: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("privilege:getAll")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    try {
      const privilegeGroup = await PrivilegeGroup.find();

      const result = privilegeGroup.map((item) => {
        const privilege = Privilege.find({ group_id: item.id }).populate(
          "group_id"
        );
        return {
          ...item,
          privilege,
        };
      });

      return res.json({ success: true, data: result });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
};

export default PrivilegeController;
