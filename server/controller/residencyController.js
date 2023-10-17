import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    city,
    country,
    image,
    facilities,
    userEmail,
  } = req.body.data;
  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        owner: { connect: { email: userEmail } },
      },
    });
    res.send({ message: "Residency created successfully", residency });
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("A residency with address already ");
    }
    throw new Error(err.message);
  }
});

export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    // orderBy là sắp xếp
    //  sắp xếp theo thời gian đăng giảm dần
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const residency = await prisma.residency.findUnique({
      where: { id: id },
    });
    res.send(residency);
  } catch (error) {
    throw new Error(error.message);
  }
});
