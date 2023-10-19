import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  getAllVisit,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/getAllVisit", getAllVisit);
router.post("/removeBooking/:id", cancelBooking);

export { router as userRoute };
