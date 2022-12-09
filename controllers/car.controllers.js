const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getCar = async (req, res) => {
  const db = getDb();
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const result = await db.collection("allCars").findOne(filter);
  res.send(result);
};

module.exports.addNewCar = async (req, res) => {
  const db = getDb();
  const car = req.body;
  if (
    !car.productName ||
    !car.image ||
    !car.about ||
    !car.price ||
    !car.quantity ||
    !car.supplierName ||
    !car.email
  ) {
    return res.send({
      success: false,
      error: "Please provide all information",
    });
  }

  await db.collection("allCars").insertOne(car);
  res.send({
    success: true,
    message: `Successfully inserted ${car.productName} `,
  });
};

module.exports.carUpdate = async (req, res) => {
  const db = getDb();
  const id = req.params.id;
  const car = req.body;
  const filter = { _id: ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      quantity: car.quantity,
    },
  };
  const result = await db
    .collection("allCars")
    .updateOne(filter, updateDoc, options);
  res.send(result);
};

module.exports.deleteCar = async (req, res) => {
  const db = getDb();
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await db.collection("allCars").deleteOne(query);
  res.send(result);
};
