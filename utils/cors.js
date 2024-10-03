import cors from "cors";

const whiteList = ["http://localhost:3001", "https://ijlaldhisa.my.id"];

const corsOptions = {
  origin: whiteList,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
