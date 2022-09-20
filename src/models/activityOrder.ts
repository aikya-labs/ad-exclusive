import mongoose from "mongoose";

let typeObj = {
  views: "VIEWS",
  clicks: "CLICKS",
};

const activityOrderSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(typeObj),
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    initialCreditBalance: {
      type: Number,
      required: true,
    },
    finalCreditBalance: {
      type: Number,
      required: true,
    },
    initialActivityBalance: {
      type: Number,
      required: true,
    },
    finalActivityBalance: {
      type: Number,
      required: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
    },
  },
  {
    timestamps: true,
  }
);

const ActivityOrder = mongoose.model("activityorder", activityOrderSchema);
export default ActivityOrder;
