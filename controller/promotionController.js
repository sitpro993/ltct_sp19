import saleDAO from "../dao/saleDAO.js";
import codeDAO from "../dao/codeDAO.js";
import validate from "../utils/validate.js";
import validateSaleDefault from "../utils/validateSale.js";

const getAllPromotionsController = async (req, res) => {
  try {
    //get dữ liệu từ query
    const column = req.query.column || "name";
    const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
      req.query.sort
    )
      ? req.query.sort
      : "asc";

    // Truy vấn database với những tham số column (tên cột) , sắp xếp theo sort
    const sales = await saleDAO.getAllSaleAndSort([[column, sort]]);

    res.status(200).send(sales); //trả về response
  } catch (error) {
    //Trả về lỗi
    res.status(500).send({ message: error.message });
  }
};

const getTrashPromotionsController = async (req, res) => {
  try {
    //get dữ liệu từ query
    const column = req.query.column || "discountCode";
    const sort = ["asc", "desc", "descending", "ascending", -1, 1].includes(
      req.query.sort
    )
      ? req.query.sort
      : "asc";
    //Truy vấn database
    const sales = await saleDAO.getTrashSaleAndSort([[column, sort]]);
    res.status(200).send(sales); //trả về response
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getPromotionDetailController = async (req, res) => {
  try {
    const sale = await saleDAO.getSaleByID(req.params.id);

    if (sale) {
      const code = await codeDAO.getCodeByID(req.params.id);
      res.status(200).send({ sale, code });
    } else {
      res.status(404).send({ message: "sale not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createPromotionController = async (req, res) => {
  try {
    const promotionStatus = await validate.validateSale(
      req.body,
      validateSaleDefault.handleValidateSale
    );
    if (promotionStatus === -1) {
      res.status(401).send({ messgae: "Input data invalid" });
      return;
    }
    const createSale = await saleDAO.createSale(req);
    if (createSale === -1) {
      res.status(401).send({ message: "Can't create new promotion" });
      return;
    }
    res.status(201).send({ message: "New Promotion Created" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deletePromotionController = async (req, res) => {
  try {
    const sales = await saleDAO.updateSaleMany(req);
    const codes = await codeDAO.updateCodeMany(req);
    res.status(200).send({ message: "Move to trash", sales, codes });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const destroyPromotionController = async (req, res) => {
  try {
    const sale = await saleDAO.destroySaleMany(req);
    const code = await codeDAO.destroyCode(req);
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

const restorePromotionController = async (req, res) => {
  try {
    const sales = await saleDAO.updateSaleMany(req);
    const codes = await codeDAO.updateCodeMany(req);
    res.status(200).send({ message: "Restore", sales, codes });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const editPromotionController = async (req, res) => {
  try {
    const promotionStatus = await validate.validateSale(
      req.body,
      validateSaleDefault.handleValidateSale
    );
    if (promotionStatus === -1) {
      res.status(401).send({ messgae: "Input data invalid" });
      return;
    }
    const data = await saleDAO.updateSaleOne(req);
    res.status(200).send({ message: "Updated Sale", data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const promotionControllerDefault = {
  getAllPromotionsController,
  getTrashPromotionsController,
  getPromotionDetailController,
  createPromotionController,
  deletePromotionController,
  destroyPromotionController,
  restorePromotionController,
  editPromotionController,
};
export default promotionControllerDefault;
