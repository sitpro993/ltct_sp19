import Code from "../models/codeModel.js";
import Sale from "../models/saleModel.js";

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

export const createCode = async (req, res) => {
  try {
    const checkCode = await Code.findOne({
      discountCode: req.body.discountCode,
    });

    const checkSaleId = await Sale.findOne({
      _id: req.body.saleId,
    });

    if (checkCode) {
      res.status(401).send({ messgae: "Discount code is exist" });
    } else if (!checkSaleId) {
      res.status(401).send({ messgae: "SaleId is not exist" });
    } else {
      //check product exist
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
      res
        .status(201)
        .send({ message: "New code created", created: createCode });
    }
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
