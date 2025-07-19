import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config/config";
import router from "./routes/v1/";
import { ApiError } from "./utils/apiError";
import { errorConverter, errorHandler } from "./middlewares/errorHandler";
const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error or index creation error:", err);
    process.exit(1); // Exit the process if there's an error
  });

app.use(express.json());

app.use("/v1", router);

app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});

app.use(errorConverter);

app.use(errorHandler);

export default app;
