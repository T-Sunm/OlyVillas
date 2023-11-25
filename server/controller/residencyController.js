import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import {cloudinary} from "../config/cloudinaryConfig.js"
export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    locationData,
    locationType,
    mapData,
    photos,
    placeSpace,
    placeType,
    placeAmeneties,
    userEmail,
  } = req.body.data;
  console.log(req.body.data);

  const uploadImage = async (image)=>{
    const uploadedResponse = await cloudinary.uploader.upload(image,{
    upload_preset:'puqkrne3'
    })
    console.log(uploadedResponse)
  return {
    public_id: uploadedResponse.public_id,
    url:uploadedResponse.secure_url
  }
  }

  const uploads = await Promise.all(photos.map(photo => uploadImage(photo)));

  console.log(uploads)

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        locationData,
        locationType,
        mapData,
        photos:uploads,
        placeSpace,
        placeType,
        placeAmeneties,
        owner: { connect: { email: userEmail } },
      },
    });
    res.send({ message: "Residency created successfully", residency });
  } catch (error) {
    if (error.code === "P2002") {
      console.log(error)

    }
    throw new Error(error.message);
  }
});

export const getAllResidencies = asyncHandler(async (req, res) => {
try {
    const residencies = await prisma.residency.findMany({
    // orderBy là sắp xếp
    //  sắp xếp theo thời gian đăng giảm dần
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
} catch (error) {
  console.log(error)
}
});

export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const residency = await prisma.residency.findUnique({
      where: { id: id },
      include:{
        owner:true
      }
    });
    if(residency){
      res.status(200).send(residency);
    }else{
      res.status(404).send({ error: 'Residency not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteResidency = asyncHandler(async(req,res)=>{
  const {id} = req.params
  try {
    const {photos} = await prisma.residency.findFirst({
      where:{
        id:id
      }
    })

    if (photos && photos.length) {
    await Promise.all(photos.map((photo) => {
      return cloudinary.uploader.destroy(photo.public_id)
        .catch(err => {
          console.error('Error deleting photo:', err);
          // Xử lý hoặc ghi lại lỗi ở đây
        });
    }));
  }
    const residency = await prisma.residency.delete({
      where:{id:id}
    })
    if(residency){
      res.status(200).send(residency);
    }else{
      res.status(404).send({ error: 'Residency not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
})