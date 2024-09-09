import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routerProject, routerCertificate } from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3001;

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.send("Hello, Dhisa is here!");
});

app.get("/ping", (_req, res) => {
  return res.send("pong 🏓");
});

app.use("/project", routerProject);
app.use("/certificate", routerCertificate);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
