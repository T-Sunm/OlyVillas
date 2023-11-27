import {
  createResidency,
  deleteResidency,
  getAllResidencies,
  getResidency,
  updateResidency,
} from "../controller/residencyController.js";
import express from "express";
const router = express.Router();

router.post("/createResidency", createResidency);
router.get("/getResidencies", getAllResidencies);
router.get("/getResidency/:id", getResidency);
router.delete("/deleteResidency/:id", deleteResidency);
router.put("/updateResidency/:id", updateResidency);

export { router as residencyRouter };
