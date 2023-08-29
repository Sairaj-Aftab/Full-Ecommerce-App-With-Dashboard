import mongoose from "mongoose";

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Undefined"],
      default: "Undefined",
    },
    dateOfBirth: {
      type: String,
    },
    profile_photo: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    joined: {
      type: Date,
    },
    address: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    zip: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    access_token: {
      type: String,
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userModel);
