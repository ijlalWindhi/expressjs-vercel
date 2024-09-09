import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { validationResult, matchedData } from "express-validator";

const prisma = new PrismaClient();

export const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: "Bad Request",
        detail: "Validation error",
        errors: errors.array(),
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

      res.status(201).json(project);
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      detail: error,
      message: "Internal server error",
      errors: [],
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: "Bad Request",
        detail: "Validation error",
        errors: errors.array(),
      });
    } else {
      const data = matchedData(req);

      const projectExists = await prisma.project.findUnique({
        where: {
          uuid: data.uuid,
        },
      });

      if (!projectExists) {
        return res.status(404).json({
          status: 404,
          message: "Not Found",
          detail: "Project not found",
          errors: [],
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

      res.status(201).json(project);
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      detail: error,
      message: "Internal server error",
      errors: [],
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
      return res.status(404).json({
        status: 404,
        message: "Not Found",
        detail: "Project not found",
        errors: [],
      });
    }

    await prisma.project.delete({
      where: {
        uuid,
      },
    });

    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      status: 500,
      detail: error,
      message: "Internal server error",
      errors: [],
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      status: 500,
      detail: error,
      message: "Internal server error",
      errors: [],
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
      return res.status(404).json({
        status: 404,
        message: "Not Found",
        detail: "Project not found",
        errors: [],
      });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      status: 500,
      detail: error,
      message: "Internal server error",
      errors: [],
    });
  }
};
