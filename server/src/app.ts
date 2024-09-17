import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Frontend
// app.use(express.static(join(__dirname, "../../client/dist")));
// // Endpoints
// app.get("/", (_req, res) => {
//   res.sendFile(join(__dirname, "../../client/dist/index.html"));
// });

// Middlerwares
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
  app.use(cors());
}

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// app.all('*', (_req, res) => {
//   res.sendFile(join(__dirname, '../../client/dist/index.html'))
// })
//

export default app;
