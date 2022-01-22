import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    description: { type: String },
    count: {
      type: Number,
      required: true,
      min: [0, "Count is positive numbers"],
    },
    usedQty: {
      type: Number,
      default: 0,
      min: [0, "usedQty is positive numbers"],
    },
    discount: {
      discountType: { type: Number, required: true }, //1: giảm giá phần trăm, 2:Giảm giá theo tiền
      discountValue: { type: Number, required: true },
      subConditions: { type: Number, default: null }, //nếu giảm giá theo phần trăm trường này hiển thị giá trị được giảm tối đa{có thể không nhập}
    },
    condition: {
      conditionType: { type: Number, required: true }, //1: priceMin, 2: totalProduct
      conditionValue: { type: Number, required: true },
    },
    discountCode: {
      type: String,
      required: [true, "discountCode is required"],
      unique: [true, "{VALUE} is exist"],
    },
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
