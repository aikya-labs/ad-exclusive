import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    isHot: {
      type: Boolean,
      default: false,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Number,
      required: true,
    },
    slotRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "slotrequest",
      },
    ],

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
    },

    adId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ad",
    },

    categoryId: {
      type: Number,
    },
    slotPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

slotSchema.index({ categoryId: 1, startTime: 1, endTime: 1 }, { unique: true });

const Slot = mongoose.model("slot", slotSchema);
export default Slot;
