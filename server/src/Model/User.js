import mongoose from "mongoose";

const UserSchema = {
  first_name: {
    type: String,
    required: [true, "Please enter a name"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "Please enter a name"],
    trim: true,
  },
  password: {
    type: String,
    minlength: [8, "Password must be at least 8 characters"],
    required: [true, "Please enter a password"],
  },
  email: {
    type: String,
    required: [true, "Please enter email address"],
    unique: true,
  },
};

export const User = mongoose.model("Users", UserSchema);
