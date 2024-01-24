# Database Connection

## Two Approaches

1. **Modular Approach:**
   Organize database connection code into modular files. For example, separate files for configuration and connection setup, i.e., the whole setup in the db folder, and connection in the index file via importing only the function.

   - Content inside db folder:

     ```javascript
     // src/db/connectDB.js
     import mongoose from "mongoose";
     import { DB_NAME } from "../constants.js";

     const connectDB = async () => {
       try {
         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useFindAndModify: false,
           useCreateIndex: true,
         });

         console.log(`\nMONGODB connected !! DB HOST: ${connectionInstance.connection.host}`);
       } catch (error) {
         console.error("MONGODB connection FAILED", error);
         process.exit(1);
       }
     };

     export default connectDB;
     ```

   - Content inside index.js folder:

     ```javascript
     import dotenv from "dotenv";
     import express from "express";
     import connectDB from "./db/index.js";

     dotenv.config({
       path: './env'
     }); //need to include experimental feature flag for it

     const app = express();

     connectDB()
       .then(() => {
         app.listen(process.env.PORT || 8000, () => {
           console.log(`Server is running at :  ${process.env.PORT}`);
         });
       })
       .catch((err) => {
         console.log("MONGODB connection FAILED !!!", err);
       });
     ```

2. **Everything in Index File:**
   Place all database connection code in a single file, often the main entry file (e.g., index.js).

   ```javascript
   import mongoose from "mongoose";
   import dotenv from "dotenv";
   import express from "express";

   dotenv.config({
     path: './env'
   }); //need to include experimental feature flag for it

   const app = express();
   ;(async () => {
     try {
       mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       app.on("error", (error) => {
         console.log("ERROR: ", error);
         throw error;
       });

       app.listen(process.env.PORT, () => {
         console.log(`App is listening on ${process.env.PORT}`);
       });
     } catch (error) {
       console.error("ERROR: ", error);
       throw error;
     }
   })();
   ```

## Error Handling

- Always use a try-catch block or promises (resolve, reject) when connecting to the database to handle potential errors.

## Asynchronous Programming

- Use `async-await` when connecting to databases, especially when data is located far away, involving I/O operations.
- Database is always in other continent

## Different ways of setting up dotenve

1. **using require syntax** :
  - simple include this code in index.js file on the top
  - As early as possible in your application, import and configure dotenv:
  ```js
   require('dotenv').config({
    path : './env';
   })
  ```
2. **using import syntax**:
  - include this code in index.js file
   ```js
   import dotenv from "dotenv";
   dotenv.config({
    path:'./env'
    }) 
   ```
  - introduce this experimental flag in package.json file
   ```json
   "dev": "nodemon `-r dotenv/config --experimental-json-modules` src/index.js"
   ```





