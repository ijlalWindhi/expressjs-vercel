import { Router } from "express";
import * as userController from "../controller/user.js";
import {
  createUserSchema,
  updateUserSchema,
  paramsUserSchema,
} from "../utils/validation-schema/user.js";

const router = Router();

router.post("/", createUserSchema, userController.createUser);
router.put("/:uuid", updateUserSchema, userController.updateUser);
router.delete("/:uuid", paramsUserSchema, userController.deleteUser);
router.get("/", userController.getAllUsers);
router.get("/:uuid", paramsUserSchema, userController.getUser);

export default router;
