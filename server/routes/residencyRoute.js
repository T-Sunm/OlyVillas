import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../controller/residencyController.js";
import express from "express";
const router = express.Router();

router.post("/createResidency", createResidency);
router.get("/getResidencies", getAllResidencies);
router.get("/getResidency/:id", getResidency);

export { router as residencyRouter };
