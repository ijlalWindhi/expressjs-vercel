import { body, param } from "express-validator";

export const createUserSchema = [
  body("email").isEmail().notEmpty().escape().trim(),
  body("password").isStrongPassword().notEmpty().escape().trim(),
  body("name").isString().notEmpty().escape().trim(),
  body("phone").isMobilePhone("id-ID").notEmpty().escape().trim(),
  body("role").isString().notEmpty().escape().trim(),
];

export const updateUserSchema = [
  param("uuid").isString().notEmpty().escape().trim(),
  body("email").isEmail().notEmpty().escape().trim(),
  body("password").isStrongPassword().notEmpty().escape().trim(),
  body("name").isString().notEmpty().escape().trim(),
  body("phone").isMobilePhone("id-ID").notEmpty().escape().trim(),
  body("role").isString().notEmpty().escape().trim(),
];

export const paramsUserSchema = [
  param("uuid").isString().notEmpty().escape().trim(),
];
