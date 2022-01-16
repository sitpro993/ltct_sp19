import Code from "../models/codeModel.js";
import Sale from "../models/saleModel.js";

const checkCode = async (data) => {
  const checkCode = await Code.findOne({
    discountCode: data,
  });
  if (checkCode) return -1;
  return 1;
};

const checkSale = async (data) => {
  const check = await Sale.findOne({
    _id: data,
  });
  if (!check) return -1;
  return 1;
};

const checkIdDefault = {
  checkCode,
  checkSale,
};
export default checkIdDefault;
