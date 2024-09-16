import { body } from "express-validator";

export const loginSchema = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .escape()
    .trim(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .escape()
    .trim(),
];
