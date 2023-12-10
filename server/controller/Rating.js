import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createRating = asyncHandler(async (req, res) => {
    const {
        userId,
        ResidencyId,
        ReservationId,
        stars,
        comment,
    } = req.body.data;

    console.log(req.body)

    try {
        const Rating = await prisma.residency.update({
            where: {
                id: ResidencyId
            },
            data: {
                Rating: {
                    create: {
                        userId,
                        ReservationId,
                        stars,
                    }
                }
            }
        })

        res.send({ message: "Rating successfully", Rating });
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
})

export const getRating = asyncHandler(async (req, res) => {
    let query = {}
    const {
        authorEmail,
        ResidencyId,
        ReservationId,
        RatingId
    } = req.body;

    try {
        const Rating = await prisma.rating.findUnique({
            where: {
                id: RatingId
            }
        })
        res.send(Rating)

    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
})