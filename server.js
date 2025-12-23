const express = require("express");
var cors = require("cors");

const appRoute = require("./src/routes");
const json = require("./src/middlewares/json.middleware");
const errorHandler = require("./src/middlewares/errorHandler.middleware");
const notFound = require("./src/middlewares/notFound.middleware");
const response = require("./src/middlewares/response.middleware");

const app = express();
const port = 3000;

var corsOptions = {
  origin: ["http://localhost:5173/f8-node-day-2-fe/"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(json);
app.use(response);

app.use("/api", appRoute);
app.use(notFound);
app.use(errorHandler);

app.listen(port, "localhost", () => {
  console.log(`Example app listening http://localhost:${port}`);
});
