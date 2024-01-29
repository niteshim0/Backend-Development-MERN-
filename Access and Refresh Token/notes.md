# Token Refresh Process

Token refresh typically involves generating a new access token using a refresh token. Here's a general outline of how token refresh might work:

1. **Generate Tokens:**
   - When a user logs in, both an access token and a refresh token are generated and sent to the client.

2. **Use Access Token for Requests:**
   - The client includes the access token in the headers of its requests to access protected resources.

3. **Access Token Expiry:**
   - Access tokens have a limited lifespan for security reasons. When an access token is about to expire, the client needs to obtain a new one.

4. **Check Access Token Expiry:**
   - Before making a request, the client checks the expiration time of the access token.

5. **Request New Access Token:**
   - If the access token is expired or about to expire, the client sends a request to the server to refresh the token.

6. **Include Refresh Token:**
   - The client sends the refresh token to the server along with the request for a new access token.

7. **Verify Refresh Token:**
   - The server verifies the refresh token's validity and authenticity.

8. **Generate New Access Token:**
   - If the refresh token is valid, the server generates a new access token and sends it back to the client.

9. **Update Access Token:**
   - The client updates its stored access token with the new one.


```javascript
//user.controller.js
const refreshAccessToken = asyncHandler(async (req, res) => {
  // Extract the refresh token from cookies or request body
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  // Check if refresh token is missing
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    // Verify the incoming refresh token using the secret
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Find user by ID from the decoded token
    const user = await User.findById(decodedToken?._id);

    // Check if the user exists
    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    // Check if incoming refresh token matches the stored refresh token
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired or used");
    }

    // Set options for HTTP-only and secure cookies
    const options = {
      httpOnly: true,
      secure: true,
    };

    // Generate new access and refresh tokens
    const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);

    // Set the new tokens as cookies and send a JSON response
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    // Handle errors during the token refresh process
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});
```
