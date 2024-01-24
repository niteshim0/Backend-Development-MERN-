# Express Server Setup

```js
//app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

//CORS_ORIGIN contanins from which URL you are accessing backend
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))

//limits for how much data one can send to backend
app.use(express.json({limt:"16kb"}))

//data from urls can be in various forms
app.use(express.urlencoded({extended:true,limit:"16kb"}))

//some data is stored on our server,for using that
app.use(express.static("public"))

//for use of cookies stored in our browser via server
app.use(cookieParser())

export {app}

```

# Explaination of each middleware or configuration

## Express initilizaion
  Here, you are initializing an Express application.
  ```js
    const app = express();
  ```

## CORS middleware
 This middleware is responsible for handling Cross-Origin Resource Sharing (CORS) by allowing or restricting access to your server based on the specified origin. The `process.env.CORS_ORIGIN` allows you to set the allowed origin dynamically using an environment variable.

 ```js
   app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }));
 ```

## Body Parsing Middleware:
 These middlewares handle parsing of incoming request bodies. `express.json` is used for parsing JSON data, and `express.urlencoded` is used for parsing URL-encoded data. The limit option is set to control the maximum size of the request body.

 ```js
  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: true, limit: "16kb" }));
 ```

## Static File Middleware:
 This middleware serves static files from the "public" directory. Any file in that directory can be accessed directly through the specified path.
 ```js
  app.use(express.static("public"));
 ```
## Cookie Parsing Middleware:
 This middleware parses cookies from the request headers and makes them available in the `req.cookies` object.

 ```js
 app.use(cookieParser());
 ```

## Exporting the Express App:
This exports the configured Express app, which can then be used in other files or modules. You can export it by default or these bracket types doesn't matter.
```js
 export { app };
```

# Middleware in Web Development

Middleware in the context of web development refers to functions or software components that have access to the request and response objects in an application's HTTP pipeline. These functions can perform various tasks, modify the request or response, and terminate the request-response cycle or pass control to the next middleware in the stack.

## Express.js and Middleware

In the case of Express.js, a popular web framework for Node.js, middleware functions play a crucial role in handling various aspects of HTTP requests and responses. Here are some common use cases for middleware:

### Parsing Request Body

Middleware like `express.json` and `express.urlencoded` is used to parse the incoming request body, allowing you to work with JSON or form data in your routes.

### Handling CORS

CORS middleware, like `cors`, helps manage Cross-Origin Resource Sharing by specifying which domains are allowed to access your server's resources.

### Static File Serving

Middleware like `express.static` allows you to serve static files (e.g., images, stylesheets) directly from a specified directory.

### Cookie Parsing

Middleware such as `cookieParser` is used to parse cookies from the request headers, making them accessible in your application.

### Authentication and Authorization

Middleware can be implemented for user authentication and authorization, checking if a user is logged in or has the necessary permissions.

### Error Handling

Middleware can handle errors that occur during the request-response cycle, providing a centralized way to manage errors.

### Logging

Middleware can log information about incoming requests, helping with debugging and monitoring.

Middleware functions in Express have access to the `request` object (`req`), the `response` object (`res`), and the `next` function. The `next` function is crucial for passing control to the next middleware in the stack. If a middleware does not call `next()`, the request-response cycle may be terminated.

Middleware is arranged in a stack, and the order in which you use them matters. They are executed in the order they are added to the application. Each middleware has the opportunity to modify the request, response, or terminate the cycle.


# AsycHandlers
 - `asyncHandler` is a utility function often used in Express.js to handle asynchronous routes. It simplifies error handling for asynchronous operations in route handlers.

 - Async handlers help manage the complexity of asynchronous code in Express.js applications and provide a cleaner and more readable way to handle errors in such scenarios.

 - It is a higher-order function.

## Using try-catch block:

```js
 const asycHandler = (fn) => async(req,res,next) => {
  try{
    await fn(req,res,next);
  }catch(error){
    res.status(err.code || 500.json({
      success:false,
      message:err.message
    }))
  }
 }
```
## Using Promises:

```js
  const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next))
  .catch((err)=>next(err));
```

# ApiError Class

The `ApiError` class is a custom error class designed to represent errors in an API. It extends the built-in `Error` class and provides additional information such as the HTTP status code, a message, an array of errors, and a stack trace.

## Constructor Parameters

- `statusCode`: The HTTP status code associated with the error.
- `message`: The error message (default: "Something went wrong").
- `errors`: An array of detailed error information (default: []).
- `stack`: The stack trace for the error (default: ""). If not provided, it captures the stack trace using `Error.captureStackTrace`.

## Class Properties

- `statusCode`: Stores the HTTP status code.
- `data`: Additional data associated with the error (set to `null` by default).
- `message`: Stores the error message.
- `success`: Indicates whether the operation was successful (set to `false` by default).
- `errors`: Stores an array of detailed error information.

## Stack Trace Handling

If a stack trace (`stack`) is provided, it is used; otherwise, `Error.captureStackTrace` captures the stack trace.

## Export Statement

The `ApiError` class is exported for use in other modules.

```javascript
// Import statements may be needed depending on your project setup.

/**
 * Custom API Error class.
 */
class ApiError extends Error {
  /**
   * Constructor for ApiError.
   * @param {number} statusCode - HTTP status code for the error.
   * @param {string} message - Error message (default: "Something went wrong").
   * @param {Array} errors - Array of detailed error information (default: []).
   * @param {string} stack - Stack trace for the error (default: "").
   */
  constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
    super(message);

    // Properties specific to ApiError
    this.statusCode = statusCode;
    this.data = null; // Additional data (can be set if needed).
    this.message = message;
    this.success = false; // Indicate that the operation was not successful.
    this.errors = errors;

    // Manage the stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Export the ApiError class for use in other modules.
export { ApiError };
```

# ApiResponse Class

The `ApiResponse` class is a simple class designed to represent a standardized response for successful API operations. It takes into account the HTTP status code, the data payload, and an optional success message.

## Constructor Parameters

- `statusCode`: The HTTP status code for the response.
- `data`: The data payload to be included in the response.
- `message`: The success message (default: "Success").

## Class Properties

- `statusCode`: Stores the HTTP status code for the response.
- `data`: Stores the data payload to be included in the response.
- `message`: Stores the success message.
- `success`: Indicates whether the operation was successful. Determined based on the HTTP status code; `true` if the status code is less than 400.

## Example Usage

```javascript
class ApiResponse{
  constructor(statusCode,data,message = "Success"){
    this.statusCode = statusCode
    this.data = data
    this.message = message
    this.success = statusCode<400
  }
}
```



