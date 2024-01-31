const changeCurrentPassword = asyncHandler(async (req, res) => {
  // Extract old and new passwords from the request body
  const { oldPassword, newPassword } = req.body;

  // Find the user by ID
  const user = await User.findById(req.user?._id);

  // Check if the old password matches the user's current password
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Old invalid password");
  }

  // Update the user's password and save without validation
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  // Return success response
  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Password changed successfully"
    )
  );
});


const getCurrentUser = asyncHandler(async (req, res) => {
  // Return the current user's details in a JSON response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        req.user,
        "Current User fetched successfully"
      )
    );
});


const updateAccountDetails = asyncHandler(async (req, res) => {
  // Extract fullName and email from the request body
  const { fullName, email } = req.body;

  // Validate the presence of both fields
  if (!fullName || !email) {
    throw new ApiError(400, "All fields are required");
  }

  // Update the user's full name and email
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email: email,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  // Return JSON response with the updated user details
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  // Retrieve the local path of the avatar file from the request
  const avatarLocalPath = req.file?.path;

  // Check if avatar file is missing
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  // Upload the avatar to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  // Check for errors during Cloudinary upload
  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading on Cloudinary");
  }

  // Update the user's avatar URL in the database
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  // Retrieve the local path of the cover image file from the request
  const coverImageLocalPath = req.file?.path;

  // Check if cover image file is missing
  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image file is missing");
  }

  // Upload the cover image to Cloudinary
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // Check for errors during Cloudinary upload
  if (!coverImage.url) {
    throw new ApiError(400, "Error while uploading on Cloudinary");
  }

  // Update the user's cover image URL in the database
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  // Return success response
  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "Cover image updated successfully"
    )
  );
});

export {changeCurrentPassword, getCurrentUser , updateAccountDetails,updateUserAvatar,updateUserCoverImage}