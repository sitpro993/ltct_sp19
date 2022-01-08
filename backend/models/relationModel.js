import mongoose from "mongoose";

const relationSchema = new mongoose.Schema(
  {
    codeId: { type: String, required: true },
    productId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Relation = mongoose.model("Relation", relationSchema);
export default Relation;
