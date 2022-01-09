import fs from "fs";
import * as csv from "fast-csv";
import User from "../models/user";
import logger from "../utils/logger";
import { Op } from "sequelize";

// return All users
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

//get user by id
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    //find user
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

//create user
const addUser = async (req, res) => {
  try {
    let { first_name, last_name, email } = req.body;
    
    //check existing email
    let existEmail = await User.findOne({ where: { email: email } });
    if (existEmail) {
      return res.status(401).json({ error: true, msg: "E-mail already taken" });
    }

    const newUser = await User.create({
      first_name,
      last_name,
      email,
    });
    return res.status(201).json({
      error: false,
      msg: "Employee Create Successfuly",
      data: newUser,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: true, msg: "Server Error" });
  }
};


// bulk user create from csv file
const csvUpload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let users = [];
    // logger.info(" __basedir", __basedir);
    let path = __basedir + "/uploads/" + req.file.filename;

    // logger.info("path", path);

    let emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    let successCount = 0;
    let errorCount = 0;
    fs.createReadStream(path)
      .pipe(
        csv.parse({
          headers: ["first_name", "last_name", "email", undefined],
          renameHeaders: true,
          ignoreEmpty: true,
        })
      )
      .validate(
        (data) =>
          data.first_name !== "" &&
          data.last_name !== "" &&
          emailPattern.test(data.email)
      )
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        successCount++;
        users.push(row);
        logger.info(`ROW=${JSON.stringify(row)}`);
      })
      .on("data-invalid", (row, rowNumber) => {
        errorCount++;
        logger.info(
          `Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`
        );
      })
      .on("end", (rowCount) => {
        logger.info(`Parsed ${rowCount} rows`);
        User.bulkCreate(users, {
          validate: true,
        })

          .then(async () => {
            res.status(200).json({
              error: false,
              total: `Parsed ${rowCount} rows`,
              success:
                `Uploaded ${successCount} row successfully from ` +
                req.file.originalname,
              failed: `${errorCount} row failed from ` + req.file.originalname,
            });
          })
          .catch((error) => {
            logger.error(error);
            res.status(500).json({
              error: error.message,
            });
          });
      });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      error: error.message,
      failed: "Could not upload the file: " + req.file.originalname,
    });
  }
};

// search employee by keword
const searchEmployee = async (req, res) => {
  try {
    const keyword = req.query.keyword.toString();
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;

    const employee = await User.findAll({
      limit,
      offset,
      where: {
        [Op.or]: [
          {
            first_name: { [Op.like]: "%" + keyword + "%" },
          },
          {
            last_name: { [Op.like]: "%" + keyword + "%" },
          },
          {
            email: { [Op.like]: "%" + keyword + "%" },
          },
        ],
      },
      order: [["ID", "DESC"]],
    });

    return res.status(200).json({
      error: false,
      query: req.query,
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({ error: true, msg: "Server error." });
  }
};

//total result by keyword 
const searchEmployeeCount = async (req, res) => {
  try {
    const keyword = req.query.keyword.toString();
    let emoloyeeCount = await User.findAndCountAll({
      where: {
        [Op.or]: [
          {
            first_name: { [Op.like]: "%" + keyword + "%" },
          },
          {
            last_name: { [Op.like]: "%" + keyword + "%" },
          },
          {
            email: { [Op.like]: "%" + keyword + "%" },
          },
        ],
      },
      order: [["ID", "DESC"]],
    });

    return res.status(200).json({
      error: false,
      count: emoloyeeCount.count,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
};

export default {
  getAllUser,
  getUser,
  addUser,
  csvUpload,
  searchEmployee,
  searchEmployeeCount,
};
