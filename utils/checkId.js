import mongoose from "mongoose";
import Promotion from "../models/promotionModel.js";
import axios from "axios";

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

const checkExistsApplyProductId = async (data) => {
  const promotion = Promotion.findOne({
    isActived: true,
    deleted: false,
    "applyProduct.applyProductType": data.applyProduct.applyProductType,
    "applyProduct.applyProductId": { $in: data.applyProduct.applyProductId },
  });
  if (promotion) return -1;
  return 1;
};

const checkExistsID = async (id, type) => {
  const url =
    type === 1
      ? "https://team-product-api.herokuapp.com/api/categories/"
      : "https://team-product-api.herokuapp.com/api/products/";
  const { data } = await axios.get(url + id);
  if (!data) return -1;
  return 1;
};
const checkIdDefault = {
  checkValidateIds,
  checkValidateId,
  checkExistsApplyProductId,
  checkExistsID,
};

export default checkIdDefault;
