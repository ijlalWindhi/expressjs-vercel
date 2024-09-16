import { Router } from "express";

import * as authController from "../controller/auth.js";
import { loginSchema } from "../utils/validation-schema/auth.js";

const router = Router();

router.post("/login", loginSchema, authController.login);
router.post("/token", authController.refreshToken);
router.delete("/logout", authController.logout);

export default router;
