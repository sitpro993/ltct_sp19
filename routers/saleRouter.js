import express from "express";
import Code from "../models/codeModel.js";
import Sale from "../models/saleModel.js";

const saleRouter = express.Router();

//lấy cả danh sách
saleRouter.get("/promotion", async (req, res) => {
  try {
    const column = req.query.column || "name";
    const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
      req.query.sort
    )
      ? req.query.sort
      : "asc";
    const sales = await Sale.find({ deleted: false }).sort([[column, sort]]);
    res.send(sales);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

saleRouter.get("/promotion/active", async (req, res) => {
  try {
    const column = req.query.column || "name";
    const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
      req.query.sort
    )
      ? req.query.sort
      : "asc";
    const sales = await Sale.find({ deleted: false }).sort([[column, sort]]);
    res.send(sales);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

saleRouter.get("/code", async (req, res) => {
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

//lấy từng phần tử
//sale collection
saleRouter.get("/promotion/:id", async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (sale) {
      const code = await Code.find({ saleId: req.params.id });
      res.send({ sale, code });
    } else {
      res.status(404).send({ message: "sale not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
//code collection
saleRouter.get("/code/:id", async (req, res) => {
  try {
    const code = await Sale.findById(req.params.id);
    if (code) {
      res.send({ code });
    } else {
      res.status(404).send({ message: "code not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//search name

//tạo mới
// sale collection
saleRouter.post("/promotion/create", async (req, res) => {
  try {
    const sale = new Sale({
      name: req.body.name,
      description: req.body.description,
      timeStart: req.body.timeStart,
      timeEnd: req.body.timeEnd,
      images: req.body.images,
    });

    const createSale = await sale.save();
    res
      .status(201)
      .send({ message: "New Promotion Created", sale: createSale });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// code collection
saleRouter.post("/code/create", async (req, res) => {
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

//xóa vĩnh viễn

//sale collection
saleRouter.delete("/promotion/destroy/:id", async (req, res) => {
  try {
    const code = await Code.deleteMany({ saleId: req.params.id });
    const sale = await Sale.findByIdAndDelete(req.params.id);

    res.status(200).send({ message: "Deleted 1 item" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
//code collection
saleRouter.delete("/code/destroy/:id", async (req, res) => {
  try {
    const data = await Code.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Deleted 1 item", data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//xóa nhiều
//sale collection
saleRouter.delete("/promotion/destroymany", async (req, res) => {
  try {
    const sale = await Sale.deleteMany({
      _id: { $in: req.body.saleIds },
    });
    const code = await Code.deleteMany({ saleId: { $in: req.body.saleIds } });
    res.status(200).send({
      message:
        sale.deleteCount > 1
          ? "Deleted 1 promotion"
          : `Deleted ${sale.deleteCount} promotion, ${code.deleteCount} code`,
      sale,
      code,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
//code collection
saleRouter.delete("/code/destroymany", async (req, res) => {
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

//chỉnh sửa
// sale collection
saleRouter.patch("/promotion/edit/:id", async (req, res) => {
  try {
    const data = await Sale.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).send({ message: "Updated Sale", data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
//code collection
saleRouter.patch("/code/edit/:id", async (req, res) => {
  try {
    const data = await Code.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).send({ message: "Updated Code", data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// //lấy danh sách trong thùng rác
saleRouter.get("/promotion/trash", async (req, res) => {
  try {
    const column = req.query.column || "discountCode";
    const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
      req.query.sort
    )
      ? req.query.sort
      : "asc";
    const sales = await Sale.find({ deleted: true }).sort([[column, sort]]);
    res.send(sales);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

saleRouter.get("/code/trash", async (req, res) => {
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

// //xóa mềm 1 hoặc nhiều id
//promotion
saleRouter.delete("/promotion/delete", async (req, res) => {
  try {
    const sales = await Sale.updateMany(
      {
        _id: { $in: req.body.saleIds },
      },
      { deleted: true, deletedAt: new Date() }
    );
    const codes = await Code.updateMany(
      { saleId: { $in: req.body.saleIds } },
      { deleted: true, deletedAt: new Date() }
    );
    res.status(200).send({ message: "Move to trash", sales, codes });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// //khôi phục xóa mềm nhiều phần tử
saleRouter.patch("/promotion/restore", async (req, res) => {
  try {
    const sales = await Sale.updateMany(
      { _id: { $in: req.body.saleIds } },
      { deleted: false, deletedAt: null },
      {
        new: true,
      }
    );
    const codes = await Code.updateMany(
      { saleId: { $in: req.body.saleIds } },
      { deleted: false, deletedAt: null },
      {
        new: true,
      }
    );
    res.status(200).send({ message: "Restore", sales, codes });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default saleRouter;

// //khôi phục xóa mềm
// saleRouter.patch("/restore/:id", async (req, res) => {
//   try {
//     const data = await Sale.updateOne(
//       { _id: req.params.id },
//       { deleted: false, deletedAt: null },
//       {
//         new: true,
//       }
//     );
//     res.status(200).send({ message: "Restore", data });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

// //xóa mềm
// saleRouter.delete("/promotion/delete/:id", async (req, res) => {
//   try {
//     const sales = await Sale.updateMany(
//       { _id: req.params.id },
//       { deleted: true, deletedAt: new Date() }
//     );
//     const codes = await Code.updateMany(
//       { saleId: { $in: req.params.id } },
//       { deleted: true, deletedAt: new Date() }
//     );
//     res.status(200).send({ message: "Move to trash", sales, codes });

//     // res.status(200).send(req.body.saleIds);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

// saleRouter.patch("/code/restore", async (req, res) => {
//   try {
//     const sales = await Code.updateMany(
//       { _id: { $in: req.body.codeIds } },
//       { deleted: false, deletedAt: null },
//       {
//         new: true,
//       }
//     );
//     res.status(200).send({ message: "Restore", sales, codes });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

//code
// saleRouter.delete("/code/delete", async (req, res) => {
//   try {
//     const codes = await Code.updateMany(
//       { _id: { $in: req.body.codeIds } },
//       { deleted: true, deletedAt: new Date() },
//       {
//         new: true,
//       }
//     );
//     res.status(200).send({ message: "Move to trash", codes });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });
