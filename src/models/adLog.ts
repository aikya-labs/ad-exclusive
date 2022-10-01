import mongoose from "mongoose";
const adLogSchema = new mongoose.Schema(
  {
    adId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ad",
    },
    locationData: {
      type: Object,
    },
    ipAddress: {
      type: String,
    },
    count: {
      type: Number,
      default: 0,
    },
    requestUrl: {
      type: String,
    },
    type: {
      type: String,
      enum: Object.values({ click: "CLICK", view: "VIEW" }),
    },
  },
  {
    timestamps: true,
  }
);

adLogSchema.index({ adId: 1, type: 1, ipAddress: 1 }, { unique: true });

const AdLog = mongoose.model("adlog", adLogSchema);
export default AdLog;
