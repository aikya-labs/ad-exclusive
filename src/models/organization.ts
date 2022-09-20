import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    freezedBalance: {
      type: Number,
      default: 0,
    },
    balanceViews: {
      type: Number,
      default: 0,
    },
    balanceClicks: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    defaultCategory: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model("organization", organizationSchema);
export default Organization;
