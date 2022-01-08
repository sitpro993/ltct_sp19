import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
  {
    saleId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    count: { type: Number },
    usedQty: { type: Number, default: 0 },
    images: { type: Array },
    percentDiscount: { type: Number, default: null },
    cashDiscount: { type: Number, default: null },
    bundledProduct: { type: String, default: null },
    level: { type: String, default: null },
    priceMin: { type: Number, default: null },
    totalProduct: { type: Number, default: null },
    discountCode: { type: String, required: true, unique: true },
    deleted: { type: Boolean, default: false },
    isActived: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);
const Code = mongoose.model("Code", codeSchema);
export default Code;
