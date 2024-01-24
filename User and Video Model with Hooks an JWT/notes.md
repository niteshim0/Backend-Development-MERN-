# MongoDB and Mongoose Notes

## MongoDB Saves Data in BSON Format

While MongoDB stores data in BSON (Binary JSON), interactions with MongoDB using Mongoose and other MongoDB drivers are typically done using JSON-like documents. The BSON encoding and decoding are handled by the MongoDB driver.

## Arrow Function and Context (this)

Arrow functions do not have their own `this` context; they inherit it from the surrounding scope. In the provided code, the arrow function is used for importing `Schema` from Mongoose. This is a common pattern in modern JavaScript and is safe in this context.

## JWT (JSON Web Token) as a Bearer Token

JWTs are indeed bearer tokens, implying that the possession of the token alone is sufficient for authorization. They are often used in authentication systems, where the possession of the token grants access. In the context of security, the JWT acts as a proof of authentication.

# User Authentication and Token Generation

## Password Encryption (pre-save hook)

The `pre` middleware is employed before saving a user to the database. It checks if the password field has been modified and proceeds to encrypt the password using bcrypt with a salt factor of 10.

```javascript
// Encrypting the password using bcrypt
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

## Password Verification (custom method)

The i`sPasswordCorrect` method is a custom method for the user schema. It facilitates the comparison of a provided password with the stored encrypted password using bcrypt's `compare` function.

```js
// Custom method of Mongoose for checking whether the entered password is correct or not
userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
};
```

## Token Generation (custom methods)

Two custom methods, generateAccessToken and generateRefreshToken, are defined for generating JWTs (JSON Web Tokens). The access token incorporates user-related information and has a specified expiration time. The refresh token, used for refreshing access tokens, typically contains minimal information about the user and also has an expiration time.

```js
 // Generating access token and refresh token
userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
};
```


