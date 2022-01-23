import promotionDAO from "../../dao/promotionDAO.js";
import checkID from "../../utils/checkId.js";
import validate from "../../utils/validate.js";
import validatePromotionDefault from "../../utils/validatePromotion.js";

const getAllPromotionsController = async (req, res) => {
  try {
    const promotions = await promotionDAO.getAllPromotionAndSort(req);
    res.status(200).send({ data: promotions });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getTrashPromotionsController = async (req, res) => {
  try {
    const Promotions = await promotionDAO.getTrashPromotionAndSort(req);
    res.status(200).send({ data: Promotions });
  } catch (error) {
    res.status(500).send({ arror: error.message });
  }
};

const getPromotionDetailController = async (req, res) => {
  try {
    const status = await validate.validatePromotion(
      req.params.id,
      checkID.checkValidateId
    );
    if (status === -1) {
      res.status(401).send({ error: "Invalid id" });
      return;
    }
    const promotion = await promotionDAO.getPromotionDetail(req.params);
    res.status(200).send({ data: promotion });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const tmp = async (id, type) => {
  const status = await checkID.checkExistsID(id, type);
  console.log(status);
  if (status === -1) {
    res.status(404).send({
      error: `${
        req.body.applyProductType === 1 ? "Category" : "Product"
      } does not exsits`,
    });
    return;
  }
};
const createPromotionController = async (req, res) => {
  try {
    const promotionStatus = await validate.validatePromotion(
      req.body,
      validatePromotionDefault.handleValidatePrompotion
    );

    if (promotionStatus === -1) {
      res.status(401).send({ error: "Input data invalid" });
      return;
    }

    //check id category, id product

    for (let id of req.body.applyProductId) {
      await tmp(id, req.body.applyProductType);
    }


    //check tồn tại của category

    const createPromotion = await promotionDAO.createPromotion(req.body);
    if (createPromotion === -1) {
      res.status(401).send({ error: "Can't create new promotion" });
      return;
    }
    res.status(201).send({ success: "New Promotion Created" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deletePromotionController = async (req, res) => {
  try {
    const status = await validate.validatePromotion(
      req.body.promotionIds,
      checkID.checkValidateIds
    );
    if (status === -1) {
      res.status(401).send({ error: "Invalid id" });
      return;
    }
    const promotions = await promotionDAO.deletePromotion(req.body);
    if (!promotions) {
      res.status(401).send({ error: "Can't delete promotions" });
      return;
    }
    res.status(200).send({ success: "Move to trash" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const destroyPromotionController = async (req, res) => {
  try {
    const status = await validate.validatePromotion(
      req.body.promotionIds,
      checkID.checkValidateIds
    );
    if (status === -1) {
      res.status(401).send({ error: "Invalid id" });
      return;
    }

    const promotion = await promotionDAO.destroyPromotion(req.body);

    res.status(200).send({
      success: promotion,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const restorePromotionController = async (req, res) => {
  try {
    const status = await validate.validatePromotion(
      req.body.promotionIds,
      checkID.checkValidateIds
    );
    if (status === -1) {
      res.status(401).send({ error: "Invalid id" });
      return;
    }
    const promotions = await promotionDAO.restorePromotion(req.body);
    res.status(200).send({ success: "Restore" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const editPromotionController = async (req, res) => {
  try {
    const status = await validate.validatePromotion(
      req.body.id,
      checkID.checkValidateId
    );
    if (status === -1) {
      res.status(401).send({ error: "Invalid id" });
      return;
    }
    const promotionStatus = await validate.validatePromotion(
      req.body,
      validatePromotionDefault.handleValidatePrompotion
    );
    if (promotionStatus === -1) {
      res.status(401).send({ messgae: "Input data invalid" });
      return;
    }
    //check id category
    const data = await promotionDAO.updatePromotionOne(req.body);
    res.status(200).send({ message: "Updated Promotion", data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const adminPromotionControllerDefault = {
  getAllPromotionsController,
  getTrashPromotionsController,
  getPromotionDetailController,
  createPromotionController,
  deletePromotionController,
  destroyPromotionController,
  restorePromotionController,
  editPromotionController,
};
export default adminPromotionControllerDefault;
