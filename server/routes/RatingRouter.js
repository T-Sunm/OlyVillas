import express from "express";
import { createRating, getRating } from "../controller/Rating.js";
const router = express.Router();

router.post('/createRating', createRating)
router.post('getRating', getRating)

export { router as ratingRouter }