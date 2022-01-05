import express from "express";
import cors from "cors";
import { sequelize } from "./models";
import logger from "./utils/logger";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect Database
(async () => {
  await sequelize.sync({ force: false });
  logger.info("Database Connected!");
})();

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ error: false, msg: "Hello Imran" });
});

app.use("/api/v1", router);

export default app;
