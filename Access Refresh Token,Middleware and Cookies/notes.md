# Access Token vs Refresh Token

## Access Token

- **Purpose:**
  - Used for accessing protected resources on behalf of the user.
  - Provides a limited and short-lived permission to perform specific actions.

- **Lifespan:**
  - Short-lived compared to refresh tokens.
  - Typically expires after a relatively short duration, for example, 15 minutes.

- **Usage:**
  - Sent with each request to access protected resources (API endpoints, for example).
  - Used to prove the authentication of the client to the server and access specific resources.

- **Security:**
  - Because of their short lifespan, even if an access token is compromised, the potential damage is limited.
  - Should be kept confidential, but its exposure for a short time is less critical.

## Refresh Token

- **Purpose:**
  - Used to obtain a new access token after the current access token expires.
  - Provides a long-lived authorization for the client to request new access tokens without the need for the user's credentials.

- **Lifespan:**
  - Typically has a longer lifespan compared to access tokens.
  - May last for days or weeks.

- **Usage:**
  - Stored securely on the client side.
  - Exchanged with the authorization server for a new access token when the current access token expires.

- **Security:**
  - Critical to be kept confidential as it represents a long-lived authorization.
  - In case of compromise, an attacker could use it to obtain new access tokens without the user's involvement.

## Token Refresh Flow

1. The client uses the refresh token to request a new access token from the authorization server.
2. The authorization server verifies the refresh token and issues a new access token.

## Security Considerations

- **Access Control:**
  - Access tokens have more restricted permissions and are suitable for short-term access.
  - Refresh tokens have broader permissions and are used for obtaining new access tokens.

- **Token Rotation:**
  - Regularly rotating refresh tokens can enhance security by limiting the exposure of a single token for an extended period.

- **Storage:**
  - Access tokens are stored on the client and should be protected but are less sensitive due to their short lifespan.
  - Refresh tokens should be stored securely on the client to prevent unauthorized use.

# Login System Implementation

## Steps to Login

1. **Get Data from req.body:**
   - Retrieve the login credentials (username or email and password) from the request body.

2. **Determine Login Type:**
   - Identify whether the user is attempting to log in using a username or an email address. This will depend on your application's design.

3. **Find the User in the Database:**
   - Query your database to find the user based on the provided username or email.

4. **Check Password:**
   - Verify that the password provided in the request matches the stored password for the corresponding user in the database.
   - If the password is incorrect, return a response indicating a wrong password.

5. **Generate Access and Refresh Tokens:**
   - If the password is correct, generate an access token and a refresh token.
   - The access token is typically a short-lived token used for authentication, while the refresh token is used to obtain a new access token when it expires.

6. **Store Tokens Securely:**
   - Store the generated tokens securely, considering best practices for token management. You might want to hash or encrypt the refresh token before storing it.

7. **Send Tokens in Cookies:**
   - Set the access token and refresh token as secure cookies in the response.
   - Ensure that these cookies are marked as secure to only be sent over HTTPS connections.

8. **Return Success Response:**
   - Return a success response to indicate that the login was successful. Include any relevant information you want to send back to the client.

9. **Handle Errors:**
   - If any errors occur during the process (e.g., user not found, wrong password), handle them gracefully and return appropriate error responses.

10. **Security Considerations:**
    - Implement additional security measures such as rate limiting, account lockout for multiple failed login attempts, and secure password storage techniques (e.g., hashing with salt).

## Example in JavaScript using Node.js and Express

```javascript
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async(userId) => {
  try{
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return {accessToken,refreshToken}

  }catch(error){
    throw new ApiError(500,"Something went wrong while generating access token and refresh token");
  }

}

const registerUser = asyncHandler( async (req,res)=> {
  //req.body almost send each data we required
  const {fullName,email,username,password} = req.body
  console.log("email" , email)

  if(
    [fullName,email,username,password].some((field)=> field?.trim() === "")
  ){
    throw new ApiError(400,"All fields are required")
  }
  
  const existedUser = await User.findOne({
    $or : [ { username } , { email }]
  })

  if(existedUser){
    throw new ApiError(409, "user with this email or username already exists")
  }

  //req.files for files
  //uploaded image on local server through multer
  const avatarLocalPath = req.files?.avatar[0]?.path;
  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
      coverImageLocalPath = req.files.coverImage[0].path
  }

  if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
  }
  
  //uploaded images from local server to third-party service
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  //checking for error uploading on cloudinary
  if(!avatar){
    throw new ApiError(400,"Avatar file is required")
  }

  const user = await User.create({
    fullName,
    avatar : avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500,"Internal Servor Erorr in registering the user")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User created Successfully")
  )

})

const loginUser = asyncHandler(async (req, res) => {
  // Extracting username, email, and password from the request body
  const { username, email, password } = req.body;

  // Checking if either username or email is provided
  if (!(username || email)) {
    throw new ApiError(400, "Username or email is required");
  }

  // Finding the user in the database by username or email
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  // If user doesn't exist, throw a 404 error
  if (!user) {
    throw new ApiError(404, "User doesn't exist");
  }

  // Checking if the provided password is correct
  const isPasswordValid = await user.isPasswordCorrect(password);

  // If password is not valid, throw a 401 error
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // Generating access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  // Fetching the logged-in user from the database (excluding password and refreshToken)
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  // Cookie options for secure cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  // Setting cookies in the response and sending a JSON response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});
```

# Cookies in Web Development

Cookies are small pieces of data stored on the user's device by the web browser. They are commonly used in web development to store user-specific information and maintain state across multiple requests. Here's an overview of cookies:

## Key Concepts

### 1. Purpose:
   - Cookies are used to store information on the user's device, allowing websites to remember stateful information between different pages or sessions.

### 2. Storage:
   - Stored as key-value pairs.
   - Limited in size (usually a few kilobytes).

### 3. Expiration:
   - Cookies can have an expiration date, after which they are automatically deleted.
   - Session cookies are temporary and expire when the browser is closed.
   - Persistent cookies have a specified expiration date and are stored until that date.

### 4. Security Attributes:
   - **HttpOnly:** Prevents client-side scripts from accessing the cookie, enhancing security against cross-site scripting (XSS) attacks.
   - **Secure:** Ensures that the cookie is only sent over secure (HTTPS) connections.

## Common Use Cases

### 1. Session Management:
   - Storing a session identifier to keep a user logged in across multiple requests.

### 2. User Preferences:
   - Storing user preferences, such as theme selection or language.

### 3. Tracking:
   - Tracking user behavior and analytics.

### 4. Shopping Carts:
   - Storing information about items in a user's shopping cart.

# Middlewares in Web Development

Middlewares in web development are functions that have access to the request and response objects in an HTTP application's request-response cycle. They can modify the request, the response, or end the request-response cycle. 

## Middlewares Basics

1. **Use of Middlewares:**
   - Middlewares are used to perform tasks such as authentication, logging, request parsing, etc.
   - They can be applied globally or to specific routes.

2. **Structure of a Middleware Function:**
   - A middleware function receives the `request` and `response` objects, and the `next` function in the application's request-response cycle.

  ```javascript
   
   const middlewareFunction = (req, res, next) => {
     // Do something with the request or response
     // Call next() to pass control to the next middleware or route handler
     next();
   };

  ```


# Global vs. Route-Specific Middleware

In web development, middleware functions play a crucial role in handling tasks during the request-response cycle. Understanding the distinction between global and route-specific middleware is essential for effective application development.

## Global Middleware

- **Definition:**
  - Global middleware is applied to all routes in the application.

- **Usage:**
  - Used for tasks that need to be performed on every incoming request, regardless of the specific route.

- **Example:**
  - Logging middleware that logs request details for all routes.

```javascript
const globalMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware or route handler
};

app.use(globalMiddleware);
```

## Route-Specific Middleware

- **Definition:**
  - Route-specific middleware is applied only to specific routes in the application.

- **Usage:**
  - Used for tasks that are specific to certain routes and should not be applied globally.

- **Example:**
  - Authentication middleware that checks user authentication for a specific route.

```javascript
//auth.middleware.js
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Extracting the token from either cookies or the Authorization header
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    // If no token is found, throw a 401 Unauthorized error
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Retrieve user information from the decoded token
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    // If the user is not found, throw a 401 Unauthorized error
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    // Attach the user information to the request object for subsequent middleware or route handlers
    req.user = user;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // If any error occurs during the token verification, throw a 401 Unauthorized error
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
```

# Logout controller

```js

const logOutUser = asyncHandler ( async (req,res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken : undefined
      }
    },
    {
      new : true
    }
  )

  const options = {
    httpOnly : true,
    secure : true
  }
  

  return res
   .status(200)
   .clearCookie("accessToken",options)
   .clearCookie("refreshToken",options)
   .json(
    new ApiResponse(
      200,
      {},
      "user logged out"
    )
   )
})
```






