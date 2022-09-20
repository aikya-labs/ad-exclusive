import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
    },
    imageLink: {
      type: String,
      required: true,
    },
    currClickCounts: {
      type: Number,
      default: 0,
    },
    currViewCounts: {
      type: Number,
      default: 0,
    },
    redirectUrl: {
      type: String,
      default: "",
    },
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "slot",
    },
    categoryId: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Ad = mongoose.model("ad", adSchema);
export default Ad;
