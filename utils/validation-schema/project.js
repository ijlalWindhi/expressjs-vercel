import { body, param } from "express-validator";

export const createProjectSchema = [
  body("title").isString().notEmpty().escape().trim(),
  body("description").isString().notEmpty().escape().trim(),
  body("url_cover").isString().notEmpty().trim(),
  body("technologies").isArray().notEmpty(),
];

export const updateProjectSchema = [
  param("uuid").isString().notEmpty().escape().trim(),
  body("title").isString().notEmpty().escape().trim(),
  body("description").isString().notEmpty().escape().trim(),
  body("url_cover").isString().notEmpty().trim(),
  body("technologies").isArray().notEmpty(),
];

export const paramsProjectSchema = [
  param("uuid").isString().notEmpty().escape().trim(),
];
