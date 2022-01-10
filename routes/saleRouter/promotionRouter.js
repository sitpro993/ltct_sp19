import express from "express";
import Code from "../../models/codeModel.js";
import Sale from "../../models/saleModel.js";

const promotionRouter = express.Router();

//PATCH /api/sale/promotion/edit/:id Chỉnh sửa CTKM
promotionRouter.patch("/edit/:id", async (req, res) => {
  try {
    const data = await Sale.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).send({ message: "Updated Sale", data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//PATCH /api/sale/promotion/restore khôi phục CTKM sau khi xóa mềm
promotionRouter.patch("/restore", async (req, res) => {
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

//DELETE /api/sale/promotion/destroy Xóa vĩnh viễn CTKM
promotionRouter.delete("/destroy", async (req, res) => {
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

//DELETE /api/sale/promotion/delete xóa mềm CTKM
promotionRouter.delete("/delete", async (req, res) => {
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

//POST /api/sale/promotion/create Tạo 1 CTKM
promotionRouter.post("/create", async (req, res) => {
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

//GET /api/sale/promotion/:id Lấy 1 CTKM theo id
promotionRouter.get("/:id", async (req, res) => {
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

//GET /api/sale/promotion/trash lấy danh sách CTKM trong thùng rác
promotionRouter.get("/trash", async (req, res) => {
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

/**
 * @swagger
 * paths:
 * /api/sale/promotion:
 *  get:
 *    description: lấy danh sách CTKM
 *    responses:
 *      '200':
 *        description: OK
 *
 */
//GET /api/sale/promotion/ lấy danh sách CTKM
promotionRouter.get("/", async (req, res) => {
  try {
    const column = req.query.column || "name";
    const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
      req.query.sort
    )
      ? req.query.sort
      : "asc";
    const sales = await Sale.find({ deleted: false }).sort([[column, sort]]);
    res.status(200).send(sales);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default promotionRouter;

// promotionRouter.get("/active", async (req, res) => {
//   try {
//     const column = req.query.column || "name";
//     const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
//       req.query.sort
//     )
//       ? req.query.sort
//       : "asc";
//     const sales = await Sale.find({ deleted: false }).sort([[column, sort]]);
//     res.send(sales);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });
