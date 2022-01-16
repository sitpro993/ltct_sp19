import Code from "../models/codeModel.js";
import Sale from "../models/saleModel.js";
import { checkCode, checkSaleId } from "../utils/checkid/checkId.js";
import { checkExists, validateCode } from "../utils/validate.js";
import { handleValidateCode } from "../utils/validecode/valideCode.js";
export const getAllCodes = async (req, res) => {
  try {
    const column = req.query.column || "name";
    const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
      req.query.sort
    )
      ? req.query.sort
      : "asc";
    const codes = await Code.find({ deleted: false }).sort([[column, sort]]);
    res.status(200).send(codes);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getTrashCodes = async (req, res) => {
  try {
    const column = req.query.column || "discountCode";
    const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
      req.query.sort
    )
      ? req.query.sort
      : "asc";
    const codes = await Code.find({ deleted: true }).sort([[column, sort]]);
    res.status(200).send(codes);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getCodeDetail = async (req, res) => {
  try {
    const code = await Code.findById(req.params.id);
    if (code) {
      res.send({ code });
    } else {
      res.status(404).send({ message: "code not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createCode = async (req) => {
  const code = new Code({
    saleId: req.body.saleId,
    name: req.body.name,
    description: req.body.description,
    count: req.body.count,
    percentDiscount: req.body.percentDiscount,
    cashDiscount: req.body.cashDiscount,
    bundledProduct: req.body.bundledProduct,
    level: req.body.level,
    priceMin: req.body.priceMin,
    totalProduct: req.body.totalProduct,
    discountCode: req.body.discountCode,
  });
  const createCode = await code.save();
  if (!createCode) return -1;
  return 1;
};

export const createCodeController = async (req, res) => {
  try {
    const checkCodeStatus = await checkExists(req.body.discountCode, checkCode);
    if (checkCodeStatus === -1)
      res.status(401).send({ messgae: "Discount code is exist" });

    const checkSaleStatus = await checkExists(req.body.saleId, checkSaleId);
    if (checkSaleStatus === -1)
      res.status(401).send({ messgae: "SaleId is not exist" });
    const codeStatus = await validateCode(req.body, handleValidateCode);
    console.log("status: " + codeStatus);
    if (codeStatus === 1) {
      console.log(req.body);
    }
    res.status(401).send({ messgae: codeStatus });
    // const status = createCode(req);
    // if (status === 1) res.status(201).send({ message: "New code created" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const destroyCode = async (req, res) => {
  try {
    const data = await Code.deleteMany({
      _id: { $in: req.body.codeIds },
    });
    res.status(200).send({
      message:
        data.deleteCount > 1
          ? "Deleted 1 item"
          : `Deleted ${data.deleteCount} items`,
      data,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const editCode = async (req, res) => {
  try {
    const data = await Code.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).send({ message: "Updated Code", data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
