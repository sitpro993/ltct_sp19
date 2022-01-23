import Promotion from "../models/promotionModel.js";

const getAllPromotionAndSort = async (req) => {
  const column = req.query.column || "name";
  const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
    req.query.sort
  )
    ? req.query.sort
    : "asc";
  return await Promotion.find({ deleted: false }).sort([[column, sort]]);
};

const getTrashPromotionAndSort = async (req) => {
  const column = req.query.column || "discountCode";
  const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
    req.query.sort
  )
    ? req.query.sort
    : "asc";
  return await Promotion.find({ deleted: true }).sort([[column, sort]]);
};

const getPromotionDetail = async (data) => {
  return await Promotion.findById(data.id);
};

const createPromotion = async (data) => {
  const promotion = new Promotion({
    name: data.name,
    description: data.description,

    discount: {
      discountType: data.discountType,
      discountValue: data.discountType,
    },
    applyProduct: {
      applyProductType: data.applyProductType,
      applyProductId: data.applyProductId,
    },
    isActived: typeof data.isActived === "boolean" ? data.isActived : false,
  });
  const createPromotion = await promotion.save();
  if (!createPromotion) return -1;
  return 1;
};

const deletePromotion = async (data) => {
  return await Promotion.updateMany(
    { _id: { $in: data.promotionIds } },
    { deleted: true, deletedAt: new Date() }
  );
};

const destroyPromotion = async (data) => {
  return await Promotion.deleteMany({ _id: { $in: data.promotionIds } });
};

const restorePromotion = async (data) => {
  return await Promotion.updateMany(
    { _id: { $in: data.promotionIds } },
    { deleted: false, deletedAt: null }
  );
};

const updatePromotionOne = async (data) => {
  return await Promotion.findOneAndUpdate(
    { _id: data.id },
    {
      name: data.name,
      description: data.description,

      discount: {
        discountType: data.discountType,
        discountValue: data.discountType,
      },
      applyProduct: {
        applyProductType: data.applyProductType,
        applyProductId: data.applyProductId,
      },
      isActived: typeof data.isActived === "boolean" ? data.isActived : false,
    },
    {
      new: true,
    }
  );
};
const getPromotionByCategoryId = async (id) => {
  return await Promotion.findOne({
    isActived: true,
    deleted: false,
    "applyProduct.applyProductType": 1,
    "applyProduct.applyProductId": parseInt(id),
  });
};
const getPromotionByProductId = async (id) => {
  return await Promotion.findOne({
    isActived: true,
    deleted: false,
    "applyProduct.applyProductType": 2,
    "applyProduct.applyProductId": parseInt(id),
  });
};
const getAllPromotions = async () => {
  return await Promotion.find({
    deleted: false,
    isActived: true,
  }).select([
    "discount",
    "name",
    "description",
    "_id",
    "applyProduct",
    "discount",
    "isActived",
  ]);
};

const promotionDAODefault = {
  getAllPromotionAndSort,
  getTrashPromotionAndSort,
  getPromotionDetail,
  createPromotion,
  deletePromotion,
  destroyPromotion,
  restorePromotion,
  updatePromotionOne,
  getPromotionByCategoryId,
  getPromotionByProductId,
  getAllPromotions,
};
export default promotionDAODefault;
