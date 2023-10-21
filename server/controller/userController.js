import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");
  let { email } = req.body;
  const existUser = await prisma.user.findUnique({ where: { email: email } });
  if (!existUser) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User registered successfully",
      user: user,
    });
  } else {
    res.status(201).send({
      message: "User already registered",
    });
  }
});
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id: idVilla } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email: email },
      // hàm select giúp lấy collect mà mình muốn ,
      // lấy collect nào thì đặt nó bằng true
      select: { bookedVisits: true },
    });
    if (
      // some() được sử dụng để kiểm tra xem có ít nhất một phần tử trong mảng thỏa mãn một điều kiện nào đó
      alreadyBooked.bookedVisits.some((IdvillaBook) => IdvillaBook === idVilla)
    )
      res.status(400).json({ message: "This Villa you already booked" });
    else {
      const user = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          // hàm push của prisma sử dụng để đẩy các giá trị đến cuối danh sách
          bookedVisits: { push: { idVilla, date } },
        },
      });
      res.send("your visit is booked successfully");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getAllVisit = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const visitVillas = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    res.status(200).send(visitVillas);
  } catch (error) {
    throw new Error(error.message);
  }
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id: idVilla } = req.params;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  const bookVisitIndex = user.bookedVisits.findIndex(
    (bookVisit) => bookVisit.idVilla === idVilla
  );
  if (bookVisitIndex === -1) {
    res.status(404).json({ message: "Booking not found" });
  } else {
    user.bookedVisits.splice(bookVisitIndex, 1);
    await prisma.user.update({
      where: { email: email },
      data: {
        bookedVisits: user.bookedVisits,
      },
    });
    res.send("Booking cancelled successfully");
  }
});

export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id: VillasId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // nếu đã thích rồi thì bỏ thích
    if (user.favResidenciesID.includes(VillasId)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((favId) => favId !== VillasId),
          },
        },
      });
      res.send({ message: "Removed from favorites", user: updateUser });
    }
    // nếu chưa thích thì thích
    else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: VillasId,
          },
        },
      });
      res.send({ message: "Updated favourites", user: updateUser });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const FavoritesVillas = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });
    res.status(200).send(FavoritesVillas);
  } catch (error) {
    throw new Error(error.message);
  }
});
