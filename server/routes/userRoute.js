import express from "express";
import {
  bookVisit,
  createUser,
  getAllVisit,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/getAllVisit", getAllVisit);

export { router as userRoute };
