import express from "express";
import mongoose from "mongoose";
import saleRouter from "./routers/saleRouter.js";
import cors from "cors";
//fake data
// import Sale from "./models/saleModel.js";
// import Code from "./models/codeModel.js";
// import { codes, sales } from "../sale.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

const port = process.env.PORT || 5000;

app.use("/api/sale", saleRouter);

//insertmany module
// app.post("/insertmany/sale", async (req, res) => {
//   try {
//     const insertMany = await Sale.insertMany(sales, function (error, docs) {});
//     res.status(201).send({ message: "Created" });
//   } catch (error) {}
// });

// app.post("/insertmany/code", async (req, res) => {
//   try {
//     const insertMany = await Code.insertMany(codes, function (error, docs) {});
//     res.status(201).send({ message: "Created" });
//   } catch (error) {}
// });

app.get("/", (req, res) => {
  res.send("This is server");
});

app.use((err, req, res, next) => {
  res.status(500).send({ messsage: err.message });
});

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
