import Sale from "../models/saleModel.js";

const getAllSaleAndSort = async (params) => {
  return await Sale.find({ deleted: false }).sort(params);
};

const getTrashSaleAndSort = async (params) => {
  return await Sale.find({ deleted: true }).sort(params);
};

const getSaleByID = async (id) => {
  return await Sale.findById(req.params.id);
};

const createSale = async (req) => {
  const sale = new Sale({
    name: req.body.name,
    description: req.body.description,
    timeStart: req.body.timeStart,
    timeEnd: req.body.timeEnd,
    images: req.body.images,
  });

  const status = await sale.save();

  if (!status) return -1;

  return 1;
};

const updateSaleMany = async (req) => {
  return await Sale.updateMany(
    {
      _id: { $in: req.body.saleIds },
    },
    { deleted: true, deletedAt: new Date() }
  );
};

const destroySaleMany = async (req) => {
  return await Sale.deleteMany({
    _id: { $in: req.body.saleIds },
  });
};

const restoreSaleMany = async (req) => {
  return await Sale.updateMany(
    { _id: { $in: req.body.saleIds } },
    { deleted: false, deletedAt: null },
    {
      new: true,
    }
  );
};

const updateSaleOne = async (req) => {
  return await Sale.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
};

const saleDAODefault = {
  getAllSaleAndSort,
  getTrashSaleAndSort,
  getSaleByID,
  createSale,
  updateSaleMany,
  destroySaleMany,
  restoreSaleMany,
  updateSaleOne,
};

export default saleDAODefault;
