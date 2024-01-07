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

export const getAllRatingbyauthorUser = async (req, res) => {
    const {
        userEmail,
        residencyId
    } = req.body;

    let query = {}

    if (userEmail) {
        query.userEmail = userEmail
    }

    if (residencyId) {
        query.id = residencyId
    }
    try {
        const residencies = await prisma.residency.findMany({
            where: query,
            select: {
                id: true
            }
        })
        const residencyIds = residencies.map(residency => residency.id);
        const ratings = await prisma.rating.findMany({
            where: {
                ResidencyId: {
                    in: residencyIds, // Sử dụng toán tử `in` để tìm theo danh sách `residencyId`
                },
            },
            select: {
                stars: true,
                createdAt: true,
                User: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                },
                Residency: {
                    select: {
                        photos: true,
                        title: true
                    }
                }
            }
        });
        res.send(ratings)
    } catch (error) {
        console.error(error);
        res.sendStatus(500).send('Internal Server Error');
    }
}