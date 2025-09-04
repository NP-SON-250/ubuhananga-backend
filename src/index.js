import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import dbConnector from "./app.js";
import morgan from "morgan";
import cors from "cors";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// API routes
app.use("/api/v1", router);

// Database connection
dbConnector();

// Use Railway’s PORT in production, fallback to .env PORT locally
const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port: http://localhost:${PORT}`);
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    author: "Ubuhanga Congozi",
    message: "Welcome to Ubuhanga APIs!",
  });
});
