const { getDb } = require("../utils/dbConnect");

module.exports.getOrder = async (req, res) => {
  const db = getDb();
  const email = req.query.email;
  if (email) {
    const query = { email: email };
    const cursor = db.collection("allCars").find(query);
    const orders = await cursor.toArray();
    res.send(orders);
  } else {
    res.status(404).send({ message: "Invalid access" });
  }
};

/* app.post("/order", async (req, res) => {
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
  await ordersCollection.insertOne(car);
  res.send({
    success: true,
    message: `Successfully inserted ${car.productName} `,
  });
});
 */
