import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import prisma from "../utils/prisma.js";
import { errorResponse, successResponse } from "../utils/responsHandler.js";
import { generateAccessToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation error", {
        code: "VALIDATION_ERROR",
        error: errors.array(),
      });
    } else {
      const data = matchedData(req);
      const user = await prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      // Check if user not found
      if (!user) {
        return errorResponse(res, 404, "User not found", {
          code: "USER_NOT_FOUND",
          error: `User with email ${data.email} not found`,
        });
      }

      // Check if password not match
      const isPasswordMatch = await bcrypt.compare(
        data.password,
        user.password,
      );
      if (!isPasswordMatch) {
        return errorResponse(res, 401, "Unauthorized", {
          code: "UNAUTHORIZED",
          error: "Invalid password",
        });
      }

      // Generate access token and refresh token
      const restractedUser = {
        uuid: user.uuid,
        email: user.email,
      };
      const accessToken = generateAccessToken(restractedUser);
      const refreshToken = jwt.sign(
        restractedUser,
        process.env.REFRESH_SECRET_KEY,
      );
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

      await prisma.refreshToken.create({
        data: {
          uuid: uuidv4(),
          token: refreshToken,
          expires_at: expiresAt,
          user_agent: req.headers["user-agent"],
          ip_address:
            req.ip ||
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress,
          user: {
            connect: {
              uuid: user.uuid,
            },
          },
        },
      });

      successResponse(res, 200, "Successfully login!", {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresAt: expiresAt,
      });
    }
  } catch (error) {
    errorResponse(res, 500, "Internal server error", {
      code: "INTERNAL_SERVER_ERROR",
      error: error,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        token: req.token,
      },
    });

    if (!refreshToken || refreshToken.revoked) {
      return errorResponse(res, 404, "Invalid refresh token", {
        code: "REFRESH_TOKEN_NOT_FOUND",
        error: `Invalid refresh token`,
      });
    }

    await prisma.refreshToken.update({
      where: {
        id: refreshToken.id,
      },
      data: {
        revoked: true,
      },
    });

    successResponse(res, 205, "Successfully logout!", {});
  } catch (error) {
    errorResponse(res, 500, "Internal server error", {
      code: "INTERNAL_SERVER_ERROR",
      error: error,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const data = matchedData(req);
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        token: data.token,
      },
      include: {
        user: true,
      },
    });

    if (!refreshToken || refreshToken.revoked) {
      return errorResponse(res, 404, "Invalid refresh token", {
        code: "REFRESH_TOKEN_NOT_FOUND",
        error: `Invalid refresh token`,
      });
    }

    if (refreshToken.expires_at < new Date()) {
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

    const restractedUser = {
      uuid: refreshToken.user.uuid,
      email: refreshToken.user.email,
    };
    const accessToken = generateAccessToken(restractedUser);

    successResponse(res, 200, "Successfully refresh token!", {
      accessToken: accessToken,
    });
  } catch (error) {
    errorResponse(res, 500, "Internal server error", {
      code: "INTERNAL_SERVER_ERROR",
      error: error,
    });
  }
};
