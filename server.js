const express = require("express");
var cors = require("cors");

const appRoutes = require("./src/routes");
const json = require("./src/middlewares/json.middleware");
const errorHandler = require("./src/middlewares/errorHandler.middleware");
const notFound = require("./src/middlewares/notFound.middleware");
const response = require("./src/middlewares/response.middleware");

const app = express();
const port = 3000;

var corsOptions = {
  origin: ["http://localhost:5173", "https://huytrantuan.github.io"],
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 300,
};

app.use(cors(corsOptions));

app.use(json);
app.use(response);

app.use("/api", appRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, "localhost", () => {
  console.log(`Example app listening http://localhost:${port}`);
});
