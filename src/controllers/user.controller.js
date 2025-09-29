import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"



const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "chai aur code okay"
  // })

  const {fullname, email, username, password} = req.body
  // console.log("email: ", email);

  // if(fullname = ""){
  //   throw new ApiError(400, "fullname is required")
  // }

  if(
    [fullname, email, username, password]
      .some((field) => field?.trim() === "")
  ){
    throw new ApiError(400, "every field is required")
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })

  if(existedUser){
    throw new ApiError(409, "user/ email already existed")
  }

  // console.log(req.files); 

  //check for image and avtaar
  const avtarLocalPath = req.files?.avtar[0]?.path
  // const coverImageLocalPath = req.files?.coverImage[0]?.path
  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverImageLocalPath = req.files.coverImage[0].path
  }

  if(!avtarLocalPath){
    throw new ApiError(400, "avtar file is required")
  }

   
  //upload on cloudinary 
  const avtar = await uploadOnCloudinary(avtarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)
  


  if(!avtar){
    throw new ApiError(400, "avtar file is required")
  }



  //create user object - create entry in db
  const user = await User.create({
    fullname, 
    avtar: avtar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  }) 

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500, "error while registering a user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "user registered successfully")
  )

})

export {registerUser}