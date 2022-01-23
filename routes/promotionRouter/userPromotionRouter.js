import express from "express"
import userPromotionController from "../../controller/promotionController/userPromotionController.js";
const userPromotionRouter = express.Router();

userPromotionRouter.get('/category/:id',userPromotionController.getPromotionByCategoryIdController)
userPromotionRouter.get('/product/:id',userPromotionController.getPromotionByProductIdController)
userPromotionRouter.get('/',userPromotionController.getAllPromotionController)

export default userPromotionRouter