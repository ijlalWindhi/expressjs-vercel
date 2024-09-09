import { body, param } from "express-validator";

export const createCertificateSchema = [
  body("title").isString().notEmpty().escape().trim(),
  body("url").isString().notEmpty().trim(),
];

export const updateCertificateSchema = [
  param("uuid").isString().notEmpty().escape().trim(),
  body("title").isString().notEmpty().escape().trim(),
  body("url").isString().notEmpty().trim(),
];

export const paramsCertificateSchema = [
  param("uuid").isString().notEmpty().escape().trim(),
];
