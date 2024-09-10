import { PrismaClient } from "../prisma/generated/client/index.js";

let prisma;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

prisma = global.prisma;

export default prisma;
