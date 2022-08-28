import Users from "../models/Users.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

const UserController = {
  register: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ username và password",
      });
    }

    try {
      const isExist = await Users.findOne({ username });
      if (isExist) {
        return res
          .status(400)
          .json({ success: false, message: "Username đã tồn tại" });
      }

      const hashPassword = await argon2.hash(password);

      const newUser = new Users({
        username,
        password: hashPassword,
      });

      await newUser.save();

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
        .json({ success: false, message: "Internal server" });
    }
  },
};

export default UserController;
