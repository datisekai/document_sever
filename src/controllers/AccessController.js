import Access from "../models/Acess.js";
const AccessController = {
  increaseAccess: async (req, res) => {
    try {
      const access = await Access.find();
      const currentAccess = await Access.findOneAndUpdate(
        { _id: access[0]._id },
        {
          count: access[0].count + 1,
        }
      );

      return res.json({ success: true, data: currentAccess });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Server gặp vấn đề, xin chờ!" });
    }
  },
};

export default AccessController;
