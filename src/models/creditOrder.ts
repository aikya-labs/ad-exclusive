import mongoose from "mongoose";

const creditOrderSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      unique: true,
    },
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
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

const CreditOrder = mongoose.model("creditorder", creditOrderSchema);
export default CreditOrder;
