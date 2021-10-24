const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const reportRouters = require("./routes/reports");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});
app.use("/api/reports", reportRouters);
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Kelas Pintar Test Backend Developer",
      version: "1.0.0",
      description: "Kelas Pintar Test Backend Developer",
      contact: {
        name: "Naufal Hakim SYahputra",
        url: "https://logrocket.com",
        email: "naufalhsyahputra@gmail.com",
      },
    },
    servers: [
      {
        url: `${process.env.APP_URL}/api`,
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
module.exports = app;
