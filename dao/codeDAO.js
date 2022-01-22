import Code from "../models/codeModel.js";

const createCode = async (data) => {
  const code = new Code({
    name: data.name,
    description: data.description,
    count: Math.floor(data.count),
    discount: {
      discountType: Math.floor(data.discountType),
      discountValue: Math.floor(data.discountValue),
      subConditions: data.subConditions,
    },
    condition: {
      conditionType: Math.floor(data.conditionType),
      conditionValue: Math.floor(data.conditionValue),
    },
    discountCode: data.discountCode,
    isActived: typeof data.isActived === "boolean" ? data.isActived : false,
  });
  const createCode = await code.save();
  if (!createCode) return -1;
  return 1;
};

const getAllCodes = async (req) => {
  const column = req.query.column || "name";
  const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
    req.query.sort
  )
    ? req.query.sort
    : "asc";
  return await Code.find({ deleted: false }).sort([[column, sort]]);
};

const getTrashCodes = async (req) => {
  const column = req.query.column || "discountCode";
  const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
    req.query.sort
  )
    ? req.query.sort
    : "asc";
  return await Code.find({ deleted: true }).sort([[column, sort]]);
};

const getCodeDetail = async (req) => {
  return await Code.findById(req.params.id);
};

const destroyCode = async (data) => {
  return await Code.deleteMany({
    _id: { $in: data.codeIds },
  });
};

const editCode = async (data) => {
  return await Code.findOneAndUpdate(
    { _id: data.id },
    {
      name: data.name,
      description: data.description,
      count: Math.floor(data.count),
      discount: {
        discountType: Math.floor(data.discountType),
        discountValue: Math.floor(data.discountValue),
        subConditions: data.subConditions,
      },
      condition: {
        conditionType: Math.floor(data.conditionType),
        conditionValue: Math.floor(data.conditionValue),
      },
      discountCode: data.discountCode,
      isActived: typeof data.isActived === "boolean" ? data.isActived : false,
    },
    {
      new: true,
    }
  );
};

const getCodeByID = async (id) => {
  return await Code.find({ saleId: id });
};

const updateCodeMany = async (req) => {
  return await Code.updateMany(
    { saleId: { $in: data.saleIds } },
    { deleted: true, deletedAt: new Date() }
  );
};

const deleteCode = async (data) => {
  return await Code.updateMany(
    { _id: { $in: data.codeIds } },
    { deleted: true, deletedAt: new Date() }
  );
};
const restoreCode = async (data) => {
  return await Code.updateMany(
    { _id: { $in: data.codeIds } },
    { deleted: false, deletedAt: null }
  );
};

const getAllCodesUser = async () => {
  return await Code.find({
    deleted: false,
    isActived: true,
  }).select([
    "discount",
    "condition",
    "name",
    "description",
    "_id",
    "count",
    "usedQty",
    "discountCode",
  ]);
};

const getCodeByCode = async (code) => {
  return await Code.findOne({
    discountCode: code,
    deleted: false,
    isActived: true,
  }).select(["discount", "condition", "name", "description", "_id"]);
};

const updateCountCode = async (id) => {
  const code = await Code.findById(id);
  if (!code) {
    return -1;
  }
  return await Code.findOneAndUpdate(
    { _id: id },
    { usedQty: code.usedQty + 1 }
  );
};

const getUsedQty = async (id) => {
  console.log(id);
  return await Code.findOne({
    _id: id,
    deleted: false,
    isActived: true,
  }).select([
    "discount",
    "condition",
    "name",
    "description",
    "_id",
    "count",
    "usedQty",
    "discountCode",
  ]);
};

const codeDAODefault = {
  createCode,
  getAllCodes,
  getTrashCodes,
  getCodeDetail,
  destroyCode,
  editCode,
  getCodeByID,
  updateCodeMany,
  getCodeByCode,
  deleteCode,
  restoreCode,
  updateCountCode,
  getAllCodesUser,
  getUsedQty,
};
export default codeDAODefault;
