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






