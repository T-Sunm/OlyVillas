import express from "express";
import { cancelReservation, createReservation, getDetailsReservation, getEarningWithMonthandYear, getEarningWithYear, getReservations, updateReservation } from "../controller/reservationController.js";
const router = express.Router();

router.post("/createReservation", createReservation)
router.post("/getReservations", getReservations)
router.post("/getDetailsReservation", getDetailsReservation)
router.delete("/deleteReservations/:id", cancelReservation)
router.patch("/updateReservation", updateReservation)
router.post("/getEarnings", getEarningWithMonthandYear)
router.post("/getEarningsWithYear", getEarningWithYear)

export { router as reservationRouter }