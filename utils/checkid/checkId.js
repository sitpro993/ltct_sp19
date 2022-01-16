import Code from "../../models/codeModel.js";
import Sale from "../../models/saleModel.js";
export const checkCode = async (data) => {
  const checkCode = await Code.findOne({
    discountCode: data,
  });
  if (checkCode) return -1;
  return 1;
};
export const checkSaleId = async (data) => {
  const check = await Sale.findOne({
    _id: data,
  });
  if (!check) return -1;
  return 1;
};
