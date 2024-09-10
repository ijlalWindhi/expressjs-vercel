import prisma from "../utils/prisma.js";
import { v4 as uuidv4 } from "uuid";
import { validationResult, matchedData } from "express-validator";

export const createCertificate = async (req, res) => {
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
      const certificate = await prisma.certificate.create({
        data: {
          uuid: uuidv4(),
          title: data.title,
          url: data.url,
        },
      });

      res.status(201).json(certificate);
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

export const updateCertificate = async (req, res) => {
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

      const certificateExists = await prisma.certificate.findUnique({
        where: {
          uuid: data.uuid,
        },
      });

      if (!certificateExists) {
        return res.status(404).json({
          status: 404,
          message: "Not Found",
          detail: "Certificate not found",
          errors: [],
        });
      }

      const certificate = await prisma.certificate.update({
        where: {
          uuid: data.uuid,
        },
        data: {
          title: data.title,
          url: data.url,
        },
      });

      res.status(201).json(certificate);
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

export const deleteCertificate = async (req, res) => {
  try {
    const { uuid } = req.params;

    const certificateExists = await prisma.certificate.findUnique({
      where: {
        uuid,
      },
    });

    if (!certificateExists) {
      return res.status(404).json({
        status: 404,
        message: "Not Found",
        detail: "Certificate not found",
        errors: [],
      });
    }

    await prisma.certificate.delete({
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

export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await prisma.certificate.findMany();

    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({
      status: 500,
      detail: error,
      message: "Internal server error",
      errors: [],
    });
  }
};

export const getCertificate = async (req, res) => {
  try {
    const { uuid } = req.params;

    const certificate = await prisma.certificate.findUnique({
      where: {
        uuid,
      },
    });

    if (!certificate) {
      return res.status(404).json({
        status: 404,
        message: "Not Found",
        detail: "Certificate not found",
        errors: [],
      });
    }

    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({
      status: 500,
      detail: error,
      message: "Internal server error",
      errors: [],
    });
  }
};
