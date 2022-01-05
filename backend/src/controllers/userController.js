import User from "../models/user";
import logger from "../utils/logger";

const getAllUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = 5;
    const offset = Math.ceil(limit * (page - 1));
    const users = await User.findAll({
      limit,
      offset,
      order: [["ID", "DESC"]],
    });

    const userCount = await User.findAndCountAll({});
    return res.status(200).json({
      error: false,
      data: users,
      currentPage: page,
      totalPage: Math.ceil(userCount.count / limit),
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: false, msg: "Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const foundUser = await User.findOne({ id: userId });
    if (!foundUser) {
      return res.status(404).json({ error: true, msg: "Not Found" });
    }
    
    return res.status(200).json({ error: false, data: foundUser });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: true, msg: "Server Error" });
  }
};

const addUser = async (req, res) => {
  try {
    let { first_name, last_name, email } = req.body;

    let existEmail = await User.findOne({ where: { email: email } });
    if (existEmail) {
      return res.status(401).json({ error: true, msg: "E-mail already taken" });
    }

    const newUser = await User.create({
      first_name,
      last_name,
      email,
    });
    return res
      .status(201)
      .json({
        error: false,
        msg: "Employee Create Successfuly",
        data: newUser,
      });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: true, msg: "Server Error" });
  }
};

export default {
  getAllUser,
  getUser,
  addUser,
};
