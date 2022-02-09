import promotionDAO from "../../dao/promotionDAO.js";

const getPromotionByCategoryIdController = async (req, res) => {
  try {
    const promotion = await promotionDAO.getPromotionByCategoryId(
      req.params.id
    );
    if (promotion === null) {
      res.status(404).send({ error: "Promotion not found" });
      return;
    }
    res.status(200).send({ data: promotion });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const getPromotionByProductIdController = async (req, res) => {
  try {
    const promotion = await promotionDAO.getPromotionByProductId(req.params.id);
    if (promotion === null) {
      res.status(404).send({ error: "Promotion not found" });
      return;
    }
    res.status(200).send({ data: promotion });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const getAllPromotionController = async (req, res) => {
  try {
    const promotions = await promotionDAO.getAllPromotions();
    res.status(200).send({ data: promotions });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const userPromotionControllerDefault = {
  getPromotionByCategoryIdController,
  getPromotionByProductIdController,
  getAllPromotionController,
};
export default userPromotionControllerDefault;
