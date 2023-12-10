import express from "express";
import {
  createUser,
  editUserEmail,
  editUserInfo,
  editUserPassword,
  getAllFavorites,
  login,
  toFav,
  verifyEmail,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/verifyEmail", verifyEmail);
router.post("/login", login)
router.post("/editUserInfo", editUserInfo)
router.post("/editEmail", editUserEmail)
router.post("/toFav/:id", toFav);
router.post("/getAllFav", getAllFavorites);
router.post('/editPassword', editUserPassword)

export { router as userRoute };
