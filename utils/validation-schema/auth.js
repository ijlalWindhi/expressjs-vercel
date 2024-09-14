import { body } from "express-validator";

export const loginSchema = [
  body("email").isEmail().notEmpty().escape().trim(),
  body("password").isStrongPassword().notEmpty().escape().trim(),
];
