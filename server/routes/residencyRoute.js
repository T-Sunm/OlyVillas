import {
  createResidency,
  deleteImageRes,
  deleteResidency,
  getAllResidencies,
  getResidency,
  updateImage,
  updateResidency,
} from "../controller/residencyController.js";
import express from "express";
const router = express.Router();

router.post("/createResidency", createResidency);
router.post("/getResidencies", getAllResidencies);
router.get("/getResidency/:id", getResidency);
router.delete("/deleteResidency/:id", deleteResidency);
router.put("/updateResidency/:id", updateResidency);
router.delete("/updateResidency/:residencyId/deleteImages", deleteImageRes);
router.put("/updateResidency/:residencyId/createImages", updateImage);
export { router as residencyRouter };
