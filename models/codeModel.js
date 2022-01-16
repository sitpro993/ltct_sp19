import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
  {
    saleId: { type: String, required: [true, "SaleId is required"] },
    name: { type: String, required: [true, "Name is required"] },
    description: { type: String },
    count: { type: Number, min: [0, "Count is positive numbers"] },
    usedQty: {
      type: Number,
      default: 0,
      min: [0, "usedQty is positive numbers"],
    },
    images: { type: Array },
    percentDiscount: { type: Number, default: null },
    cashDiscount: { type: Number, default: null },
    bundledProduct: { type: String, default: null },
    level: {
      type: String,
      default: 1,
      min: [1, "Level is 1 or 2 or 3"],
      max: [3, "Level is 1 or 2 or 3"],
    },
    priceMin: { type: Number, default: null },
    totalProduct: { type: Number, default: null },
    discountCode: {
      type: String,
      required: [true, "discountCode is required"],
      unique: true,
    },
    deleted: { type: Boolean, default: false },
    isActived: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
)
const Code = mongoose.model("Code", codeSchema)

export default Code


