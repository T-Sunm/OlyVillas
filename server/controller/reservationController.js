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

  console.log(userId)

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
        Residency: {
          include: {
            photos: true,
          }
        },
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
    console.log(error)
    res.status(500).send({ message: "An error occurred while fetching reservations." });
  }
})

export const getDetailsReservation = async (req, res) => {
  const { reservationID } = req.body;

  try {
    const reservation = await prisma.reservation.findUnique({
      where: {
        id: reservationID
      },
      include: {
        Residency: {
          include: {
            photos: true,
          }
        },
        Rating: true
      },
    });

    if (reservation) {
      const safeReservation = {
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        Residency: {
          ...reservation.Residency,
          createdAt: reservation.Residency.createdAt.toISOString()
        }
      };
      res.send(safeReservation);
    } else {
      res.status(404).send({ message: "Reservation not found." });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "An error occurred while fetching the reservation." });
  }
};


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

export const getEarningWithMonthandYear = async (req, res) => {
  const { month, year, userEmail } = req.body

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  console.log(req.body)

  try {
    const residencies = await prisma.residency.findMany({
      where: {
        userEmail: userEmail
      },
      select: {
        id: true
      }
    })
    const residencyIds = residencies.map(residency => residency.id);

    const reservations = await prisma.reservation.findMany({
      where: {
        ResidencyId: {
          in: residencyIds, // Sử dụng toán tử `in` để tìm theo danh sách `residencyId`
        },
        startDate: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const totalEarnings = reservations.reduce((total, reservation) => {
      return total + reservation.price;
    }, 0);
    res.json({ totalEarnings: totalEarnings });
  } catch (error) {
    console.error(error);
    res.sendStatus(500).send('Internal Server Error');
  }
}

export const getEarningWithYear = async (req, res) => {
  const { year, userEmail } = req.body

  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  console.log(req.body)

  try {
    const residencies = await prisma.residency.findMany({
      where: {
        userEmail: userEmail
      },
      select: {
        id: true
      }
    })
    const residencyIds = residencies.map(residency => residency.id);

    const reservations = await prisma.reservation.findMany({
      where: {
        ResidencyId: {
          in: residencyIds, // Sử dụng toán tử `in` để tìm theo danh sách `residencyId`
        },
        startDate: {
          gte: startDate,
          lte: endDate,
        },
        Status: "Success"
      },
      select: {
        price: true,
        startDate: true
      }
    });

    res.json({ reservations });
  } catch (error) {
    console.error(error);
    res.sendStatus(500).send('Internal Server Error');
  }
}