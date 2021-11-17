const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const app = express();

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/todo", routes);

//routes
app.get("/", (req, res) => res.send("Hello World!"));

//mongodb
mongoose.connect("mongodb://localhost/mernTodo");
//server
app.listen(4000, () => console.log(`Example app listening on port 4000!`));
