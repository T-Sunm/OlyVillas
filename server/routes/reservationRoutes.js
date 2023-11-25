


import express from "express";
import { cancelReservation, createReservation, getReservations, updateReservation } from "../controller/reservationController.js";
const router = express.Router();

router.post("/createReservation",createReservation)
router.post("/getReservations",getReservations)
router.delete("/deleteReservations/:id",cancelReservation)
router.patch("/updateReservation",updateReservation)

export {router as reservationRouter}