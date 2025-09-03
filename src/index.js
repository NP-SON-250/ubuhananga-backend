import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import dbConnector from "./app.js";
import morgan from "morgan";
import cors from "cors";


const app = express();
dotenv.config();


app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", router);
dbConnector;
const PORT = process.env.MONGOPORT || 4200;

app.listen(process.env.MONGOPORT, () => {
  console.log(`🚀 Server running on port: http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    author: "Ubuhanga Congozi ",
    message: "Welcome to Ubuhanga APIs!",
  });
});
