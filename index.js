const express = require("express");
const cors = require("cors");
const { connectToServer } = require("./utils/dbConnect");
const inventories = require("./routers/v1/inventories.route");
const car = require("./routers/v1/car.router");
const order = require("./routers/v1/order.router");

const app = express();
const port = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());
// jwt
/* */

// mongodb

connectToServer((error) => {
  if (!error) {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}`)
    );
  } else {
    console.log(error);
  }
});

// inventor's route
// api > http://localhost:5000/api/v1/inventories
app.use("/api/v1/inventories", inventories);

// single car
// api > http://localhost:5000/api/v1/car/6275097676fe43ddf47eb748
app.use("/api/v1/car", car);

// all orders
// api >
app.use("/api/v1/order", order);

app.get("/", (req, res) => {
  res.send("hello world...");
});

app.all("*", (req, res) => {
  res.send("not found");
});
