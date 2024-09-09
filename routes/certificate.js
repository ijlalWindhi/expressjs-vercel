import { Router } from "express";
import * as certificateController from "../controller/certificate.js";
import {
  createCertificateSchema,
  updateCertificateSchema,
  paramsCertificateSchema,
} from "../utils/validation-schema/certificate.js";

const router = Router();

router.post(
  "/",
  createCertificateSchema,
  certificateController.createCertificate
);
router.put(
  "/:uuid",
  updateCertificateSchema,
  certificateController.updateCertificate
);
router.delete(
  "/:uuid",
  paramsCertificateSchema,
  certificateController.deleteCertificate
);
router.get("/", certificateController.getAllCertificates);
router.get(
  "/:uuid",
  paramsCertificateSchema,
  certificateController.getCertificate
);

export default router;
