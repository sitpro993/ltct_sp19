import express from "express";
import connectDB from "./connectDB.js";
import saleRouter from "./routes/saleRouter/saleRouter.js";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


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

app.get("/", (req, res) => {
  res.send("This is server");
});

app.use((err, req, res, next) => {
  res.status(500).send({ messsage: err.message });
});

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
