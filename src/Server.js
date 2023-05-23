const express = require("express");
const routes = require("./routes/api");
// set up an express app
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);
// listen for requests
app.listen(8080, function () {
  console.log("Listening...");
});
app.get("/tasks", function (req, res) {
  console.log("Get Request");
  res.end();
});
app.get("/", function (req, res) {
  console.log("get request");
  res.send({ name: "Haidi" }); //JSON object
});

// to run this type of "node index" in your terminal
//note: index is the file name "index.js"

// or use "nodemon index" for an automatic refresh of the page
