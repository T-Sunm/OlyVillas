import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  getAllFavorites,
  getAllVisit,
  toFav,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/getAllVisit", getAllVisit);
router.post("/removeBooking/:id", cancelBooking);
router.post("/toFav/:id", toFav);
router.post("/getAllFav", getAllFavorites);

export { router as userRoute };
