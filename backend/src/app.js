import express from "express";
import cors from "cors";
import { sequelize } from "./models";
import logger from "./utils/logger";
import { router } from "./routes";
import path from 'path'

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//handle cors issue
app.use(cors());
global.__basedir = __dirname ;
//serve static files
app.use(express.static(path.join(__dirname, '/uploads/')));

//connect Database
(async () => {
  await sequelize.sync({ force: false });
  logger.info("Database Connected!");
})();

//hello routes
app.get("/", (req, res) => {
  res.status(200).json({ error: false, msg: "Hello Imran" });
});

// define router
app.use("/api/v1", router);

export default app;
