import express from "express";
import Code from "../../models/codeModel.js";
import Sale from "../../models/saleModel.js";

const codeRouter = express.Router();

//PATCH /api/sale/code/ sửa 1 mã KM
codeRouter.patch("/edit/:id", async (req, res) => {
  try {
    const data = await Code.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).send({ message: "Updated Code", data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//DELETE /api/sale/code/destroymany xóa nhiều mã KM
codeRouter.delete("/destroymany", async (req, res) => {
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
});

//DELETE /api/sale/code/destroy/:id Xóa vĩnh viễn 1 mã KM
codeRouter.delete("/destroy/:id", async (req, res) => {
  try {
    const data = await Code.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Deleted 1 item", data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//POST /api/sale/code/ Tạo 1 mã KM
codeRouter.post("/create", async (req, res) => {
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
});

//GET /api/sale/code/ lấy mã KM theo id
codeRouter.get("/:id", async (req, res) => {
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
});

//GET /api/sale/code/ lấy danh sách mã KM trong thùng rác
codeRouter.get("/trash", async (req, res) => {
  try {
    const column = req.query.column || "discountCode";
    const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
      req.query.sort
    )
      ? req.query.sort
      : "asc";
    const codes = await Code.find({ deleted: true }).sort([[column, sort]]);
    res.send(codes);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//GET /api/sale/code/ lấy danh sách toàn bộ mã KM
codeRouter.get("/", async (req, res) => {
  try {
    const column = req.query.column || "name";
    const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
      req.query.sort
    )
      ? req.query.sort
      : "asc";
    const codes = await Code.find({ deleted: false }).sort([[column, sort]]);
    res.send(codes);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default codeRouter;
