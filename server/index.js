const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const createError = require("http-errors");
const cors = require("cors");

const app = express();

const server = http.createServer(app);

app.use(cors());

app.set("port", process.env.PORT || 5555);
app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send({ message: "Welcome Aboard" });
});

require("./controllers/Game")(server);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((error, req, res, _) => {
  console.error(error.stack);

  const response = {
    status: error.status || 500,
    message: error.message || "Internal server error",
  };

  if (req.app.get("env") === "development") {
    response["stack"] = error.stack;
  }

  res.status(response.status).send(response);
});

server.listen(app.get("port"), () => {
  console.log("Listening on port %d", app.get("port"));
});
