const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting...");

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info("connected to mongodb");
  })
  .catch((error) => {
    logger.error("connection error:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;