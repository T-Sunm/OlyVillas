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
  const {emailUser} = req.body

  console.log(req.body)
  try {

    // xóa các reservation của house này
  const reservation = await prisma.reservation.deleteMany({
    where:{
      ResidencyId:id
    }
  })
  
  // cập nhật nhà yêu thích của User
  const user = await prisma.user.findUnique({
      where: { email:emailUser },
  });
   await prisma.user.update({
    where:{
      email:emailUser
    },
    data:{
      favResidenciesID:{
        set: user.favResidenciesID.filter((favId) => favId !== id),
      }
    }
  })

  // xóa ảnh của nhà này
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

export const deleteImageRes = asyncHandler(async(req,res)=>{
  const {residencyId} = req.params
  const {idImage}= req.body

  console.log(residencyId,idImage)
    try {
        const {photos} = await prisma.residency.findFirst({
        where:{
          id:residencyId
        }
      })

      // kiểm tra xem trong obj có obj nào trong mảng có thuộc tính id === idImage
      if(photos.some((photo) => photo.public_id=== idImage) ){
        await cloudinary.uploader.destroy(idImage)
        .catch(err=>{
          console.error('Error deleting photo:', err);
        })
      }

      const updatedPhotos = photos.filter(photo => photo.public_id !== idImage);
      const residency = await prisma.residency.update({
        where:{
          id:residencyId
        },
        data:{
          photos:updatedPhotos
        }
      })
      if(residency){
        res.status(200).send(residency);
      }else{
        res.status(404).send({ error: 'Residency not found' });
      }
    } catch (error) {
      throw new Error(error.message)
    }
})

export const updateImage = asyncHandler(async () => {
  const { residencyId } = req.params;
  const { photo } = req.body;

  try {
    // Tìm kiếm residency
    const residency = await prisma.residency.findUnique({
      where: {
        id: residencyId
      }
    });

    if (!residency) {
      return res.status(404).send({ error: 'Residency not found' });
    }

    // Hàm tải ảnh lên Cloudinary
    const uploadImage = async (image) => {
      try {
        const uploadedResponse = await cloudinary.uploader.upload(image, {
          upload_preset: 'puqkrne3'
        });
        console.log(uploadedResponse);
        return {
          public_id: uploadedResponse.public_id,
          url: uploadedResponse.secure_url
        };
      } catch (uploadError) {
        throw new Error(`Error uploading image: ${uploadError.message}`);
      }
    };

    // Thực hiện tải ảnh
    const upload = await uploadImage(photo);
    residency.photos.push(upload);

    // Cập nhật residency
    const updatedResidency = await prisma.residency.update({
      where: {
        id: residencyId
      },
      data: {
        photos: residency.photos
      }
    });

    res.status(200).send(updatedResidency);

  } catch (error) {
    // Xử lý các loại lỗi khác nhau
    if (error.message.startsWith('Error uploading image:')) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'An unexpected error occurred' });
    }
  }
});

export const updateResidency  = asyncHandler(async(req,res)=>{
  const {id} = req.params
  const data = req.body

  console.log(data)

  try {
    const residency = await prisma.residency.update({
      where:{
        id:id
      },
      data:data
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

