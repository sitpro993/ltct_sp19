import express from "express";
import connectDB from "./connectDB.js";
import saleRouter from "./routes/saleRouter/saleRouter.js";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
//fake data
// import Sale from "./models/saleModel.js";
// import Code from "./models/codeModel.js";
// import { codes, sales } from "../sale.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(cors());

const port = process.env.PORT || 5000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Promotion API",
      description: "Promotion API Information",
      contact: { name: "Group 19" },
      server: ["http://localhost:5000"],
    },
  },
  apis: [".routes/*js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
