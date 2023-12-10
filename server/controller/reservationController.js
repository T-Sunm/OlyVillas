import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
export const createReservation = asyncHandler(async (req, res) => {
  const {
    userId,
    ResidencyId,
    tripInfo,
    price,
    startDate,
    endDate,
  } = req.body;
  try {
    const reservation = await prisma.residency.update({
      where: {
        id: ResidencyId
      },
      data: {
        Reservations: {
          create: {
            userId,
            tripInfo,
            price,
            Status: "Pending",
            startDate,
            endDate,
          }
        }
      },
    });
    res.send({ message: "Reservation created successfully", reservation });
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("A residency with address already ");
    }
    throw new Error(error.message);
  }
});

export const getReservations = asyncHandler(async (req, res) => {
  const { ResidencyId, userId, authorEmail } = req.body.params

  const query = {};
  if (ResidencyId) {
    query.ResidencyId = ResidencyId
  }
  if (userId) {
    query.userId = userId
  }
  if (authorEmail) {
    query.Residency = { userEmail: authorEmail }
  }
  try {
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        Residency: true,
        Rating: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // chuyển ngày tháng thành định dạng ISO 8601 để đảm bảo độ chính xác 
    const safeReservation = reservations.map((reservation) => (
      {
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        Residency: {
          ...reservation.Residency,
          createdAt: reservation.Residency.createdAt.toISOString()
        }
      }))

    res.send(safeReservation)
  } catch (error) {
    res.status(500).send({ message: "An error occurred while fetching reservations." });
  }
})

export const cancelReservation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await prisma.reservation.update({
      where: {
        id: id
      },
      data: {
        Status: "Cancel Reservations"
      }
    })
    res.send(reservation)
  } catch (error) {
    res.status(500).send({ message: "An error occurred while deleting reservations." });
  }
})
export const updateReservation = asyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    const reservation = await prisma.reservation.update({
      where: {
        id: id
      },
      data: {
        Status: "Success"
      }
    })
    res.send(reservation)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "An error occurred while deleting reservations." });
  }
})