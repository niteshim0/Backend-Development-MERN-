# Flow of Routes and Controllers

## 1. Starting point : `app.js`

Route declarations are imported and used as middlewares to handle incoming requests. These declarations are then transferred to the main route.js file.

```js
//app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))

app.use(express.json({limt:"16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())


//routes import
import userRouter from "./routes/user.route.js";


//routes declaration
app.use("/api/v1/users",userRouter);

export {app}

```

## 2. Control transfers to `userRouter or routes/user.route.js`

In `route.js`, the routing logic is handled. Endpoint definitions are associated with specific controller methods. When a request hits a particular endpoint, the corresponding controller is called to execute the required logic.

```js
//user.route.js
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser)
// router.route("/login").post(loginUser)

export default router;
```

## 3. A particular endpoint hits let's say `register` then control will be transferred to `registerUser controller`

In `controller.js`, actual logic for handling requests is implemented. Each controller method corresponds to a specific endpoint. When a route is triggered, the associated controller method is executed, generating the desired response.

```js
//user.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req,res)=> {
  res.status(200).json({
    message : "register and controller"
  })
})

export { registerUser};
```

