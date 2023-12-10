import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'



export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");
  let { email, password } = req.body;
  const existUser = await prisma.user.findUnique({ where: { email: email } });
  if (!existUser) {
    const hashPass = await bcrypt.hash(password, 10)
    const data = { ...req.body, password: hashPass }
    const user = await prisma.user.create({
      data: data,
      include: {
        favResidenciesID: true
      }
    });


    // Chuyển đổi mảng favResidenciesID để chỉ chứa các ResidencyId
    const favResidenciesOnlyIds = user.favResidenciesID.map(item => item.ResidencyId);
    user.favResidenciesID = favResidenciesOnlyIds

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

export const verifyEmail = asyncHandler(async (req, res) => {
  let { email } = req.body
  const existUser = await prisma.user.findUnique({ where: { email: email } });
  if (existUser) {
    res.send({
      message: "User already registered",
      user: true,
    });
  } else {
    res.status(201).send({
      message: "User not registed",
      user: false
    });
  }
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      favResidenciesID: true
    }
  });

  if (!user) {
    return res.status(404).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng." });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(400).json({ message: "mật khẩu không đúng." });
  }
  const token = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );

  // Chuyển đổi mảng favResidenciesID để chỉ chứa các ResidencyId
  const favResidenciesOnlyIds = user.favResidenciesID.map(item => item.ResidencyId);
  user.favResidenciesID = favResidenciesOnlyIds

  // Remove password from the response
  const { password: _, ...userWithoutPassword } = user;
  res.status(200).json({ token, user: userWithoutPassword });
})


export const editUserInfo = asyncHandler(async (req, res) => {
  const data = req.body
  let { email } = req.body;
  const existUser = await prisma.user.findUnique({ where: { email: email } });
  if (existUser) {
    const user = await prisma.user.update(
      {
        where: {
          email: email
        },
        data: {
          firstName: data.firstName,
          lastName: data.lastName
        },
        include: {
          favResidenciesID: true
        }
      }
    );
    const token = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    // Chuyển đổi mảng favResidenciesID để chỉ chứa các ResidencyId
    const favResidenciesOnlyIds = user.favResidenciesID.map(item => item.ResidencyId);
    user.favResidenciesID = favResidenciesOnlyIds

    // Remove password from the response
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ token, user: userWithoutPassword });
  } else {
    res.status(500).send({
      message: "Error",
    });
  }

})

export const editUserEmail = asyncHandler(async (req, res) => {
  let { newEmail, oldEmail } = req.body;
  const existUser = await prisma.user.findUnique({ where: { email: oldEmail } });
  console.log(existUser)
  if (existUser) {
    const user = await prisma.user.update(
      {
        where: {
          email: oldEmail
        },
        data: {
          email: newEmail
        },
        include: {
          favResidenciesID: true
        }
      }
    );
    const token = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    // Chuyển đổi mảng favResidenciesID để chỉ chứa các ResidencyId
    const favResidenciesOnlyIds = user.favResidenciesID.map(item => item.ResidencyId);
    user.favResidenciesID = favResidenciesOnlyIds

    // Remove password from the response
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ token, user: userWithoutPassword });
  } else {
    res.status(500).send({
      message: "Error",
    });
  }
})

export const editUserPassword = asyncHandler(async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  console.log(req.body)

  // Check if all fields are provided
  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Update password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    console.log(hashedPassword)
    const userUpdate = await prisma.user.update({
      where: { email: email },
      data: { password: hashedPassword },
      include: {
        favResidenciesID: true
      }
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    // Chuyển đổi mảng favResidenciesID để chỉ chứa các ResidencyId
    const favResidenciesOnlyIds = userUpdate.favResidenciesID.map(item => item.ResidencyId);
    userUpdate.favResidenciesID = favResidenciesOnlyIds

    const { password: _, ...userWithoutPassword } = userUpdate;
    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id: VillasId } = req.params;

  console.log(email, VillasId)
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        favResidenciesID: true
      }
    });

    console.log(user)

    const isFavorite = user.favResidenciesID.some((favResidency) => favResidency.ResidencyId === VillasId);
    // nếu đã thích rồi thì bỏ thích
    if (isFavorite) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            deleteMany: {
              ResidencyId: VillasId
            }
          },
        },
        include: {
          favResidenciesID: true
        }
      });

      // Chuyển đổi mảng favResidenciesID để chỉ chứa các ResidencyId
      const favResidenciesOnlyIds = updateUser.favResidenciesID.map(item => item.ResidencyId);
      updateUser.favResidenciesID = favResidenciesOnlyIds

      res.send({ message: "Removed from favorites", user: updateUser });
    }
    // nếu chưa thích thì thích
    else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            create: {
              ResidencyId: VillasId
            }
          },
        },
        include: {
          favResidenciesID: true
        }
      });
      // Chuyển đổi mảng favResidenciesID để chỉ chứa các ResidencyId
      const favResidenciesOnlyIds = updateUser.favResidenciesID.map(item => item.ResidencyId);
      updateUser.favResidenciesID = favResidenciesOnlyIds
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
      include: {
        favResidenciesID: true
      }
    });

    // Chuyển đổi mảng favResidenciesID để chỉ chứa các ResidencyId
    const favResidenciesOnlyIds = updateUser.favResidenciesID.map(item => item.ResidencyId);
    updateUser.favResidenciesID = favResidenciesOnlyIds
    res.status(200).send(FavoritesVillas);
  } catch (error) {
    throw new Error(error.message);
  }
});
