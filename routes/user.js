import { Router } from "express";

import * as userController from "../controller/user.js";
import {
  createUserSchema,
  updateUserSchema,
  paramsUserSchema,
} from "../utils/validation-schema/user.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.post(
  "/",
  authenticateToken,
  createUserSchema,
  userController.createUser,
);
router.put(
  "/:uuid",
  authenticateToken,
  updateUserSchema,
  userController.updateUser,
);
router.delete(
  "/:uuid",
  authenticateToken,
  paramsUserSchema,
  userController.deleteUser,
);
router.get("/", authenticateToken, userController.getAllUsers);
router.get(
  "/:uuid",
  authenticateToken,
  paramsUserSchema,
  userController.getUser,
);

export default router;
