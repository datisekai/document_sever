import UserPrivilege from "../models/UserPrivilege.js";
import Users from "../models/Users.js";

const UserPrivilegeController = {
  handlePrivilege: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("nguoidung:privilege")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const { privilege_id, user_id } = req.body;

    console.log(privilege_id);
    if (!user_id || !privilege_id || !Array.isArray(privilege_id)) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ" });
    }

    try {
      const currentUser = await Users.findById(user_id).select("-password");
      if (!currentUser) {
        return res
          .status(404)
          .json({ success: false, message: "Tài khoản không tồn tại" });
      }

      await UserPrivilege.deleteMany({ user_id });
      privilege_id.forEach(async (element) => {
        const newUserPrivilege = new UserPrivilege({
          user_id,
          privilege: element,
        });

        await newUserPrivilege.save();
      });

      const userRole = await UserPrivilege.find({
        user_id,
      }).populate("privilege");
      if (userRole && userRole.length > 0) {
        currentUser = {
          ...currentUser._doc,
          privilege: userRole.map((item) => item.privilege.url_match),
        };
      }

      return res.json({ success: true, data: currentUser });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
};

export default UserPrivilegeController;
