import { Router } from "express";
import * as projectController from "../controller/project.js";
import {
  createProjectSchema,
  updateProjectSchema,
  paramsProjectSchema,
} from "../utils/validation-schema/project.js";

const router = Router();

router.post("/", createProjectSchema, projectController.createProject);
router.put("/:uuid", updateProjectSchema, projectController.updateProject);
router.delete("/:uuid", paramsProjectSchema, projectController.deleteProject);
router.get("/", projectController.getAllProjects);
router.get("/:uuid", paramsProjectSchema, projectController.getProject);

export default router;
