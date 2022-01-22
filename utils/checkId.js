import Code from "../models/codeModel.js";
import Sale from "../models/saleModel.js";
import mongoose from "mongoose";

const checkCode = async (data) => {
  const checkCode = await Code.findOne({
    discountCode: data,
  });
  if (checkCode) return -1;
  return 1;
};

const checkValidateIds = async (data) => {
  const objectId = mongoose.Types.ObjectId;
  let status = 1;
  data.forEach((e) => {
    if (!objectId.isValid(e)) {
      status = -1;
    }
  });
  return status;
};
const checkValidateId = async (id) => {
  const objectId = mongoose.Types.ObjectId;
  if (!objectId.isValid(id)) {
    return -1;
  }
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
  checkValidateIds,
  checkValidateId,
};
export default checkIdDefault;
