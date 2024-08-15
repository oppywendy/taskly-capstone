//app.js
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { restricted } = require("./middleware/auth.js");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes");
const organizationRoutes = require("./routes/organizationRoutes");

const YAML = require("yamljs");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests at this time, please try again later."
});

app.use(limiter);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", restricted, organizationRoutes);
app.use("/api", restricted, taskRoutes);
app.use("/api", restricted, boardRoutes);

const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const uri = process.env.MONGODB_URI;
console.log("MongoDB URI:", uri);

if (!uri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Adding the route from serve.js

module.exports = app;
