import { body, param } from "express-validator";

export const createUserSchema = [
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
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol",
    )
    .escape()
    .trim(),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .escape()
    .trim(),
  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone("id-ID")
    .withMessage("Invalid phone number format, must be in Indonesia format")
    .escape()
    .trim(),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isString()
    .escape()
    .trim(),
];

export const updateUserSchema = [
  param("uuid")
    .notEmpty()
    .withMessage("UUID is required")
    .isString()
    .escape()
    .trim(),
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
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol",
    )
    .escape()
    .trim(),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .escape()
    .trim(),
  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone("id-ID")
    .withMessage("Invalid phone number format, must be in Indonesia format")
    .escape()
    .trim(),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isString()
    .escape()
    .trim(),
];

export const paramsUserSchema = [
  param("uuid")
    .notEmpty()
    .withMessage("UUID is required")
    .isString()
    .escape()
    .trim(),
];
