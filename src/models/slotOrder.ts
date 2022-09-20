import mongoose from "mongoose";

const slotOrderSchema = new mongoose.Schema(
  {
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "slot",
      required: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      required: true,
    },
    slotRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "slotrequest",
      required: true,
    },
    adId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ad",
    },

    categoryId: {
      type: Number,
    },
    initialBalance: {
      type: Number,
      required: true,
    },
    finalBalance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SlotOrder = mongoose.model("slotorder", slotOrderSchema);
export default SlotOrder;
