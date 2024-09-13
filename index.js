import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import {
  routerProject,
  routerCertificate,
  routerCareer,
} from "./routes/index.js";
import corsOptions from "./utils/cors.js";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3001;

app.use(cookieParser());
app.use(express.json());
app.use(corsOptions);

app.get("/", (_req, res) => {
  res.send("Hello, Dhisa is here!");
});

app.get("/ping", (_req, res) => {
  return res.send("pong 🏓");
});

app.use("/project", routerProject);
app.use("/certificate", routerCertificate);
app.use("/career", routerCareer);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
