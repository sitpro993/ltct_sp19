import express from "express";
import userPromotionController from "../../controller/promotionController/userPromotionController.js";
const userPromotionRouter = express.Router();

//GET /api/sale/promotion/user/category/:id lấy promotion theo categoryid của bên nhóm product
userPromotionRouter.get(
  "/category/:id",
  userPromotionController.getPromotionByCategoryIdController
);

//GET /api/sale/promotion/user/product/:id lấy promotion theo productid cung cấp bới nhóm product
userPromotionRouter.get(
  "/product/:id",
  userPromotionController.getPromotionByProductIdController
);

//GET /api/sale/promotion/user/ lấy toàn bộ promotion
userPromotionRouter.get("/", userPromotionController.getAllPromotionController);

export default userPromotionRouter;
