import cors from "cors";

const whiteList = [
  "http://localhost:3001",
  "https://ijlaldhisa.my.id",
  "https://www.ijlaldhisa.my.id",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Request from origin:", origin);

    if (!origin) {
      console.log("No origin specified");
      return callback(null, true);
    }

    const isWhitelisted = whiteList.some((domain) => {
      const match = origin === domain;
      console.log(`Checking ${origin} against ${domain}: ${match}`);
      return match;
    });

    if (isWhitelisted) {
      console.log("Origin is whitelisted");
      callback(null, true);
    } else {
      console.log("Origin is not whitelisted");
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
