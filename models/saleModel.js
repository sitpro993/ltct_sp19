import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    description: { type: String },
    timeStart: { type: Date, required: [true, "Time start is required"] },
    timeEnd: { type: Date, required: [true, "Time end is required"] },
    images: { type: Array },
    deleted: { type: Boolean, default: false },
    isActived: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);
const Sale = mongoose.model("Sale", saleSchema);
export default Sale;
