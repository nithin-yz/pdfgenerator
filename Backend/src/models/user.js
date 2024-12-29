const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Check if the model already exists to avoid OverwriteModelError
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
