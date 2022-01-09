import express from "express";
import codeRouter from "./codeRouter/codeRouter.js";
import promotionRouter from "./promotionRouter/promotionRouter.js";

const saleRouter = express.Router();

saleRouter.use("/promotion", promotionRouter);
saleRouter.use("/code", codeRouter);

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
