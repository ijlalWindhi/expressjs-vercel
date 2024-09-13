import { Router } from "express";
import * as careerController from "../controller/career.js";
import {
  createCareerSchema,
  updateCareerSchema,
  paramsCareerSchema,
} from "../utils/validation-schema/career.js";

const router = Router();

router.post("/", createCareerSchema, careerController.createCareer);
router.put("/:uuid", updateCareerSchema, careerController.updateCareer);
router.delete("/:uuid", paramsCareerSchema, careerController.deleteCareer);
router.get("/", careerController.getAllCareers);
router.get("/:uuid", paramsCareerSchema, careerController.getCareer);

export default router;
