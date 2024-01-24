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