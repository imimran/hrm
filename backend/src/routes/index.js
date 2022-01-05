import express from "express";
import UserRouter from "./userRoutes";

const router = express.Router();

router.use("/employee", UserRouter);

router.all("*", (req, res) => {
  res.status(404).send("Route not found");
});

export { router };
