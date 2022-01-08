import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    timeStart: { type: Date, required: true },
    timeEnd: { type: Date, required: true },
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
