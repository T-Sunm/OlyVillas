import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  getAllVisit,
  toFav,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/getAllVisit", getAllVisit);
router.post("/removeBooking/:id", cancelBooking);
router.post("/toFav/:id", toFav);

export { router as userRoute };
