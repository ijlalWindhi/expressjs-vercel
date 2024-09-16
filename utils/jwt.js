import jwt from "jsonwebtoken";

export function generateAccessToken(data) {
  return jwt.sign({ data }, process.env.SECRET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
}
