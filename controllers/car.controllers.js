const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getAllCars = async (req, res) => {
  const db = getDb();
  const cursor = await db.collection("order").find({}).toArray();
  res.send(cursor);
};
