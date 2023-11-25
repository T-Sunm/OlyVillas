import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'
export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");
  let { email,password } = req.body;
  const existUser = await prisma.user.findUnique({ where: { email: email } });
  if (!existUser) {
    const hashPass = await bcrypt.hash(password,10)
    const data = {...req.body , password:hashPass}
    const user = await prisma.user.create({ data: data});
    // Remove password from the response
    const { password: _, ...userWithoutPassword } = user;
    res.send({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } else {
    res.status(500).send({
      message: "Error",
    });
  }
});

export const verifyEmail = asyncHandler(async (req,res)=>{
  let {email} = req.body
  const existUser = await prisma.user.findUnique({ where: { email: email } });
  if (existUser) {
    res.send({
      message: "User already registered",
      user: true,
    });
  } else {
    res.status(201).send({
      message: "User not registed",
      user:false
    });
  }
})

export const login = asyncHandler(async (req,res)=>{
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return res.status(404).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng." });
  }

  const isPasswordValid = await bcrypt.compare( password,user.password )
  if (!isPasswordValid) {
    return res.status(400).json({ message: "mật khẩu không đúng." });
  }
  const token = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );
  // Remove password from the response
const { password: _, ...userWithoutPassword } = user;
  res.status(200).json({ token, user: userWithoutPassword});
})

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


export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id: VillasId } = req.params;

  console.log(email, VillasId)
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
