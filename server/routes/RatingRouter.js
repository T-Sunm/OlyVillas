import express from "express";
import { createRating, getAllRatingbyauthorUser, getRating } from "../controller/Rating.js";
const router = express.Router();

router.post('/createRating', createRating)
router.post('getRating', getRating)
router.post('/getAllRatingbyUser', getAllRatingbyauthorUser)

export { router as ratingRouter }