import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "discountCode is required"],
      unique: [true, "{VALUE} is exist"],
    },
    description: { type: String },

    discount: {
      discountType: { type: Number, required: true }, //1: giảm giá phần trăm, 2:Giảm giá theo tiền
      discountValue: { type: Number, required: true },
    },
    applyProduct: {
      applyProductType: { type: Number, required: true }, //1 : áp dụng trên category, 2: áp dụng trến sản phẩm
      applyProductId: { type: Array, required: true },
    },
    deleted: { type: Boolean, default: false },
    isActived: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);
const Promotion = mongoose.model("Promotion", promotionSchema);
export default Promotion;
