import Code from "../models/codeModel.js";
import Sale from "../models/saleModel.js";

export const getAllPromotions = async (req, res) => {
  try {
    //get dữ liệu từ query
    const column = req.query.column || "name";
    const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
      req.query.sort
    )
      ? req.query.sort
      : "asc";

    // Truy vấn database với những tham số column (tên cột) , sắp xếp theo sort
    const sales = await Sale.find({ deleted: false }).sort([[column, sort]]);
    res.status(200).send(sales); //trả về response
  } catch (error) {
    //Trả về lỗi
    res.status(500).send({ message: error.message });
  }
};

export const getTrashPromotions = async (req, res) => {
  try {
    //get dữ liệu từ query
    const column = req.query.column || "discountCode";
    const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
      req.query.sort
    )
      ? req.query.sort
      : "asc";
    //Truy vấn database
    const sales = await Sale.find({ deleted: true }).sort([[column, sort]]);
    res.status(200).send(sales); //trả về response
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getPromotionDetail = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (sale) {
      const code = await Code.find({ saleId: req.params.id });
      res.status(200).send({ sale, code });
    } else {
      res.status(404).send({ message: "sale not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const createPromotion = async (req, res) => {
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
};

export const deletePromotion = async (req, res) => {
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
};

export const destroyPromotion = async (req, res) => {
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
};

export const restorePromotion = async (req, res) => {
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
};

export const editPromotion = async (req, res) => {
  try {
    const data = await Sale.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).send({ message: "Updated Sale", data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};