import mongoose from 'mongoose';

const slotRequestSchema = new mongoose.Schema(
  {
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'slot',
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'organization',
    },
    imageLink: {
      type: String,
    },
    redirectUrl: {
      type: String,
      default: '',
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    approvedBy: {
      type: Number,
    },

    categoryId: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const SlotRequest = mongoose.model('slotrequest', slotRequestSchema);
export default SlotRequest;
