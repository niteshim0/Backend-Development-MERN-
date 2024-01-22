# Data Modeling for Backend with Mongoose

- When working on the backend, the primary consideration should be what data (data fields or data points) to store and how to store it. All other aspects should be secondary.

- **MOON MODELER:** A paid service for visualizing MongoDB and Mongoose ODM schema designs.

- **ER Diagrams Knowledge:** Understanding Entity-Relationship (ER) diagrams aids in designing effective MongoDB schemas, especially for complex relationships.

- **Mongoose ODM for Node.js:**
  - Mongoose is an elegant MongoDB object modeling solution for Node.js.
  - Provides a schema-based solution with built-in features like type casting, validation, query building, and business logic hooks.

- **Boilerplate Reduction:**
  - Mongoose reduces the need for boilerplate code by handling MongoDB validation, casting, and business logic.

- **Code Consistency:**
  - Maintain consistent coding styles and naming conventions for a readable and understandable codebase.

- **Basic Mongoose Model Setup:**
  - Import mongoose module.
  - Define a schema using `new mongoose.Schema({...})`.
  - Create a model using `mongoose.model("ModelName", schema)`.
  - Export the model for use in other parts of the application.
  - ` import mongoose from "mongoose"
      const userSchema = new mongoose.Schema({//defines what data you are storing},   {timestamps:true});
      export const User = mongoose.model("User"(what name you want to give to your modle),userSchema(on which basis this model should be created));`

- **Connecting User-Defined Types:**
  - Use `mongoose.Schema.Types.ObjectId` for references.
  - Use the `ref` property to specify the referenced model.

  ```javascript
  import mongoose from "mongoose";

  const userSchema = new mongoose.Schema({
      // defines what data you are storing
      // ...
      createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
      },
  }, { timestamps: true });

  export const User = mongoose.model("User", userSchema);
  ```

- **Timestamps and Model Naming:**
  - Use `{ timestamps: true }` in the schema to add `createdAt` and `updatedAt` fields  automatically.
  - The model name "User" is stored in MongoDB as "users" by default.

