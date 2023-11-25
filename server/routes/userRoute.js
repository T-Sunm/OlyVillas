import express from "express";
import {
  bookVisit,
  createUser,
  getAllFavorites,
  getAllVisit,
  login,
  toFav,
  verifyEmail,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/verifyEmail", verifyEmail);
router.post("/login",login)
router.post("/bookVisit/:id", bookVisit);
router.post("/getAllVisit", getAllVisit);
router.post("/toFav/:id", toFav);
router.post("/getAllFav", getAllFavorites);

export { router as userRoute };
