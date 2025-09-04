import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import dbConnector from "./app.js";
import morgan from "morgan";
import cors from "cors";

dotenv.config();
const app = express();

// Trust proxy (important for Railway HTTPS)
app.set("trust proxy", 1);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Root endpoint (should be BEFORE listen)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    author: "Ubuhanga Congozi",
    message: "Welcome to Ubuhanga APIs!",
  });
});

// API routes
app.use("/api/v1", router);

// Database connection
dbConnector();

// Use Railway’s PORT in production
const PORT = process.env.PORT || 3000;
app.listen(PORT,"0.0.0.0", () => {
  console.log(`🚀 Server running on port: http://localhost:${PORT}`);
});
