import cors from "cors";

const whiteList = ["http://localhost:3001", "https://ijlaldhisa.my.id"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export default cors(corsOptions);
