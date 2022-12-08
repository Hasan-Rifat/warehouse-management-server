const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getInventories = async (req, res) => {
  const db = getDb();
  const id = req.params.id;
  const cursor = await db.collection("allCars").find({}).toArray();
  res.send(cursor);
};
