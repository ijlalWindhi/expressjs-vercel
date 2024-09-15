import jwt from "jsonwebtoken";

import { errorResponse } from "./responsHandler.js";

export function generateAccessToken(data) {
  return jwt.sign({ data }, process.env.SECRET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
}

export async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return errorResponse(res, 401, "Unauthorized", {
      code: "UNAUTHORIZED",
      error: "Token not found",
    });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await prisma.user.findUnique({
      where: { uuid: decoded.uuid },
    });
    if (!user)
      return errorResponse(res, 403, "Invalid token", {
        code: "INVALID_TOKEN",
        error: "Invalid token",
      });
    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 403, "Invalid token", {
      code: "INVALID_TOKEN",
      error: "Invalid token",
    });
  }
}
