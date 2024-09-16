import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import { errorResponse } from "../utils/responsHandler.js";

export async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader ? authHeader.split(" ")[1] : null;

  if (!accessToken) {
    return errorResponse(res, 401, "Unauthorized", {
      code: "ACCESS_TOKEN_REQUIRED",
      error: "Access token required",
    });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
    const user = await prisma.user.findUnique({
      where: { uuid: decoded.data.uuid },
    });
    if (!user) {
      return errorResponse(res, 403, "Forbidden", {
        code: "INVALID_TOKEN",
        error: "Invalid token",
      });
    }
    req.user = user;
    req.token = accessToken;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // Access token expired, attempt to refresh
      return await refreshAccessToken(req, res);
    }
    return errorResponse(res, 403, "Forbidden", {
      code: "INVALID_TOKEN",
      error: "Invalid token",
    });
  }
}

async function refreshAccessToken(req, res) {
  const refreshToken = req.cookies["refresh-token"];

  if (!refreshToken) {
    return errorResponse(res, 401, "Unauthorized", {
      code: "REFRESH_TOKEN_REQUIRED",
      error: "Refresh token required",
    });
  }

  try {
    const refreshTokenData = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!refreshTokenData) {
      return errorResponse(res, 403, "Forbidden", {
        code: "INVALID_REFRESH_TOKEN",
        error: "Invalid refresh token",
      });
    } else if (refreshTokenData.revoked) {
      return errorResponse(
        res,
        403,
        "Your refresh token has been revoked. Please login again.",
        {
          code: "REFRESH_TOKEN_REVOKED",
          error: "Refresh token revoked",
        },
      );
    } else if (refreshTokenData.expires_at < new Date()) {
      return errorResponse(
        res,
        401,
        "Your session has expired. Please login again.",
        {
          code: "REFRESH_TOKEN_EXPIRED",
          error: "Refresh token expired",
        },
      );
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

    // At this point, the refresh token is valid
    // Instead of generating a new access token here, we inform the client to request a new one
    return errorResponse(res, 401, "Access Token Expired", {
      code: "ACCESS_TOKEN_EXPIRED",
      error: "Access token expired, please request a new one",
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 403, "Forbidden", {
      code: "INVALID_REFRESH_TOKEN",
      error: "Invalid refresh token",
    });
  }
}
