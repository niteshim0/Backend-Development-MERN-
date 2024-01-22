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

# Storing Binary Data in MongoDB

## Introduction
When dealing with binary data such as images, PDFs, and videos, directly storing them in a MongoDB database using the `Buffer` type is generally considered a bad practice. Instead, it is recommended to store such data outside the database, often on a server or utilizing third-party APIs like AWS S3 or Cloudinary. The preferred approach is to store a URL or reference to the location where the binary data is stored.

## Reasons for Avoiding Direct Storage in MongoDB
1. **Limited Document Size:** MongoDB has a document size limit of 16 MB, making direct storage impractical for large binary data.

2. **Performance Issues:** Retrieving large binary data with each document can impact performance, especially in the case of multiple or concurrent requests.

3. **Backup and Restore Challenges:** Managing backups and restores of databases with large binary data can be resource-intensive.

## Best Practice Example using Mongoose
Here's a simplified example using Mongoose to model binary data storage with a reference to the external location:

```javascript
import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  // Other file-related metadata fields
  filename: String,
  contentType: String,
  size: Number,
  // Store the URL or reference to the file location
  fileUrl: String,
});

export const File = mongoose.model('File', fileSchema);
```


