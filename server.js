const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");
const app = express();

const config = require("./config");

// Configuracion para evitar errores de CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

console.log(config);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

// Put all API endpoints under '/api'
app.get("/api/status", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/api", routes);

// Serve static files from the React app
const root = path.join(__dirname, "client/build");
app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

app.listen(process.env.PORT || 6000);

console.log("App running and listening on 6000");
