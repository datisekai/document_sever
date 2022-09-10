import Users from "../models/Users.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import UserPrivilege from "../models/UserPrivilege.js";
import PrivilegeGroup from "../models/PrivilegeGroup.js";

const UserController = {
  register: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(404).json({
        success: false,
        message: "Vui lòng nhập đầy đủ username và password",
      });
    }

    try {
      const isExist = await Users.findOne({ username });
      if (isExist) {
        return res
          .status(404)
          .json({ success: false, message: "Username đã tồn tại" });
      }

      const hashPassword = await argon2.hash(password);

      const newUser = new Users({
        username,
        password: hashPassword,
      });

      await newUser.save();

      const UserPrivilegeDefault = [
        "630ddadda281cca915e3d4dd",
        "630ddb01a281cca915e3d4e1",
        "630ddb45d2d7378cdb9b0008",
        "630ddc4cd2d7378cdb9b0016",
        "630ddc67d2d7378cdb9b001a",
        "630ddc78d2d7378cdb9b001c",
      ];

      await Promise.all(
        UserPrivilegeDefault.map((item) => {
          const newUserPrivilege = new UserPrivilege({
            user_id: newUser._id,
            privilege: item,
          });
          return newUserPrivilege.save();
        })
      );

      const token = jwt.sign(
        { _id: newUser._id, username: newUser.username },
        process.env.SECRET_JWT,
        { expiresIn: "12h" }
      );

      return res.json({
        success: true,
        data: token,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  getMyInformation: async (req, res) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Vui lòng nhập token" });
    }

    try {
      const detoken = jwt.verify(token, process.env.SECRET_JWT);
      if (!detoken) {
        return res
          .status(401)
          .json({ success: false, message: "Token không khả dụng" });
      }

      let currentUser = await Users.findById(detoken._id).select("-password");
      if (!currentUser) {
        return res
          .status(401)
          .json({ success: false, message: "Tài khoản không tồn tại" });
      }

      const userRole = await UserPrivilege.find({
        user_id: currentUser._id,
      }).populate("privilege");
      if (userRole) {
        let privilege_group_pre = [];
        userRole.forEach((item) => {
          if (
            !privilege_group_pre.some(
              (element) => element === item.privilege.group_id
            )
          ) {
            privilege_group_pre.push(item.privilege.group_id);
          }
        });
        const privilege_group = await PrivilegeGroup.find({
          _id: {
            $in: privilege_group_pre,
          },
        });
        currentUser = {
          ...currentUser._doc,
          privilege: userRole.map((item) => item.privilege.url_match),
          privilege_group,
        };
      }

      return res.json({ success: true, data: currentUser });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(404).json({
        success: false,
        message: "Vui lòng nhập đầy đủ username và password",
      });
    }

    try {
      const currentUser = await Users.findOne({ username });
      if (!currentUser) {
        return res
          .status(404)
          .json({ success: false, message: "Username không tồn tại" });
      }
      const passwordValid = await argon2.verify(currentUser.password, password);
      if (!passwordValid) {
        return res.status(400).json({
          success: false,
          message: "Username or password không chính xác",
        });
      }

      const token = jwt.sign(
        { _id: currentUser._id, username: currentUser.username },
        process.env.SECRET_JWT,
        { expiresIn: "12h" }
      );

      return res.json({ success: true, data: token });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  updateUser: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("nguoidung:update")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const { _id, password, mssv, avatar, name, email } = req.body;
    if (!_id) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập _id" });
    }

    if (password) {
      const hashPassword = await argon2.hash(password);
      password = hashPassword;
    }

    try {
      const newUser = {
        _id,
        password,
        mssv,
        avatar,
        name,
        email,
      };

      const currentUser = await Users.findOneAndUpdate({ _id }, newUser).select(
        "-password"
      );

      if (!currentUser) {
        return res
          .status(404)
          .json({ success: false, message: "User không tồn tại" });
      }

      return res.json({ success: true, data: { mssv, avatar, name, email } });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  deleteUser: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("nguoidung:delete")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const _id = req.query._id;
    if (!_id) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập _id" });
    }

    try {
      const currentUser = await Users.findOneAndUpdate(
        { _id },
        { status: false }
      );
      if (!currentUser) {
        return res
          .status(404)
          .json({ success: false, message: "User không tồn tại" });
      }

      return res.json({ success: true, data: currentUser });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  getAllUser: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("nguoidung:getAll")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    try {
      const users = await Users.find().select("-password").sort("-createdAt");

      return res.json({ success: true, data: users });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
  getDetailUser: async (req, res) => {
    const privilege = JSON.parse(req.privilege);
    if (!privilege.includes("nguoidung:getDetail")) {
      return res
        .status(401)
        .json({ success: false, message: "Bạn không có quyền truy cập" });
    }
    const { _id } = req.query;
    if (!_id) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập _id" });
    }

    try {
      let currentUser = await Users.findById(_id).select("-password");
      if (!currentUser) {
        return res
          .status(404)
          .json({ success: false, message: "User không tồn tại" });
      }

      const userRole = await UserPrivilege.find({
        user_id: currentUser._id,
      }).populate("privilege");

      if (userRole) {
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

export default UserController;
