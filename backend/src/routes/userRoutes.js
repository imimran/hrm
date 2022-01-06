import UserController from "../controllers/userController";
import express from "express";
import file from "../middlewares/fileHandler";
import inputValidator from "../middlewares/inputValidator";
import { createUserSchema } from "../validators/userValidators";

const router = express.Router();

router.get("/all", UserController.getAllUser);
router.get("/get/:userId", UserController.getUser);
router.post(
  "/create",
  file.form,
  inputValidator(createUserSchema),
  UserController.addUser
);
router.post('/upload', file.uploadFile, UserController.csvUpload)


export default router;
