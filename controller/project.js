import { v4 as uuidv4 } from "uuid";
import { validationResult, matchedData } from "express-validator";

import prisma from "../utils/prisma.js";
import { errorResponse, successResponse } from "../utils/responsHandler.js";

export const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation error", {
        code: "VALIDATION_ERROR",
        error: errors.array(),
      });
    } else {
      const data = matchedData(req);
      const project = await prisma.project.create({
        data: {
          uuid: uuidv4(),
          title: data.title,
          description: data.description,
          url_cover: data.url_cover,
          technologies: data.technologies,
        },
      });

      successResponse(res, 201, "Successfully create project!", project);
    }
  } catch (error) {
    errorResponse(res, 500, "Internal server error", {
      code: "INTERNAL_SERVER_ERROR",
      error: error,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation error", {
        code: "VALIDATION_ERROR",
        error: errors.array(),
      });
    } else {
      const data = matchedData(req);

      const projectExists = await prisma.project.findUnique({
        where: {
          uuid: data.uuid,
        },
      });

      if (!projectExists) {
        return errorResponse(res, 404, "Data not found", {
          code: "DATA_NOT_FOUND",
          error: `Project with uuid ${data.uuid} not found`,
        });
      }

      const project = await prisma.project.update({
        where: {
          uuid: data.uuid,
        },
        data: {
          title: data.title,
          description: data.description,
          url_cover: data.url_cover,
          technologies: data.technologies,
        },
      });

      successResponse(res, 200, "Successfully update project!", project);
    }
  } catch (error) {
    errorResponse(res, 500, "Internal server error", {
      code: "INTERNAL_SERVER_ERROR",
      error: error,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { uuid } = req.params;

    const projectExists = await prisma.project.findUnique({
      where: {
        uuid,
      },
    });

    if (!projectExists) {
      return errorResponse(res, 404, "Data not found", {
        code: "DATA_NOT_FOUND",
        error: `Project with uuid ${uuid} not found`,
      });
    }

    await prisma.project.delete({
      where: {
        uuid,
      },
    });

    successResponse(res, 204, "Successfully delete certificate!");
  } catch (error) {
    errorResponse(res, 500, "Internal server error", {
      code: "INTERNAL_SERVER_ERROR",
      error: error,
    });
  }
};

export const getAllProjects = async (_req, res) => {
  try {
    const projects = await prisma.project.findMany();

    successResponse(res, 200, "Successfully get all projects!", projects);
  } catch (error) {
    errorResponse(res, 500, "Internal server error", {
      code: "INTERNAL_SERVER_ERROR",
      error: error,
    });
  }
};

export const getProject = async (req, res) => {
  try {
    const { uuid } = req.params;

    const project = await prisma.project.findUnique({
      where: {
        uuid,
      },
    });

    if (!project) {
      return errorResponse(res, 404, "Data not found", {
        code: "DATA_NOT_FOUND",
        error: `Project with uuid ${uuid} not found`,
      });
    }

    successResponse(res, 200, "Successfully get project!", project);
  } catch (error) {
    errorResponse(res, 500, "Internal server error", {
      code: "INTERNAL_SERVER_ERROR",
      error: error,
    });
  }
};
