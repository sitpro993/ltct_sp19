import express from "express";
import { createPromotion, deletePromotion, destroyPromotion, editPromotion, getAllPromotions, getPromotionDetail, getTrashPromotions, restorePromotion } from "../../controller/promotionController.js";

const promotionRouter = express.Router();

//PATCH /api/sale/promotion/edit/:id Chỉnh sửa CTKM
promotionRouter.patch("/edit/:id", editPromotion);

//PATCH /api/sale/promotion/restore khôi phục CTKM sau khi xóa mềm
promotionRouter.patch("/restore", restorePromotion);

//DELETE /api/sale/promotion/destroy Xóa vĩnh viễn CTKM
promotionRouter.delete("/destroy", destroyPromotion);

//DELETE /api/sale/promotion/delete xóa mềm CTKM
promotionRouter.delete("/delete", deletePromotion);

//POST /api/sale/promotion/create Tạo 1 CTKM
promotionRouter.post("/create", createPromotion);

//GET /api/sale/promotion/:id Lấy 1 CTKM theo id
promotionRouter.get("/:id", getPromotionDetail);

//GET /api/sale/promotion/trash lấy danh sách CTKM trong thùng rác
promotionRouter.get("/trash", getTrashPromotions);

//GET /api/sale/promotion/ lấy danh sách CTKM
promotionRouter.get("/", getAllPromotions);

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
