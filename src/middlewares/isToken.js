import jwt from "jsonwebtoken";
import UserPrivilege from "../models/UserPrivilege.js";

const isToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Bạn cần đăng nhập",
    });
  try {
    const detoken = jwt.verify(token, process.env.SECRET_JWT);
    const userRole = await UserPrivilege.find({
      user_id: detoken._id,
    }).populate("privilege");

    const privilege = userRole.map((item) => item.privilege.url_match);

    req.privilege = JSON.stringify(privilege);
    req.user_id = detoken._id;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error Token",
    });
  }
};

export default isToken;
