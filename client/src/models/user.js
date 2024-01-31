// Import Mongoose
const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  firstName: String,
  lastName: String,
  image: String,
  birthdate: Date,
});

// Create the user model
const User = mongoose.model('user', UserSchema);

// Export the user model
module.exports = User;