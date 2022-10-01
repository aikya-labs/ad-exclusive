import mongoose from "mongoose";

const defaultAdSchema = new mongoose.Schema(
  {
    imageLink: {
      type: String,
      required: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    click: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const DefaultAd = mongoose.model("defaultad", defaultAdSchema);
export default DefaultAd;
