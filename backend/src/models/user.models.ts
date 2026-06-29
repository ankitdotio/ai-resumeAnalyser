import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: [true, "USERNAME IS REQUIRED"],
    unique: [true, "USERNAME IS TAKEN"],
  },
  email: {
    type: String,
    require: [true, "EMAIL IS REQUIRED"],
    unique: [true, "EMAIL IS TAKEN"],
  },
  password: {
    type: String,
    require: [true, "PASSWORD IS REQUIRED"],
  },
});

export const userModel = mongoose.model("user", userSchema);
