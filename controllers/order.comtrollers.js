const { getDb } = require("../utils/dbConnect");

module.exports.getOrder = async (req, res) => {
  const db = getDb();
  const decodedEmail = req.decoded.email;
  const email = req.query.email;
  if (email === decodedEmail) {
    const query = { email: email };
    const cursor = db.collection("order").find(query);
    const orders = await cursor.toArray();
    res.send(orders);
  } else {
    res.status(404).send({ message: "Invalid access" });
  }

  //   const cursor = await db.collection("order").find({}).toArray();
  //   res.send(cursor);
};

// app.get("/order", verifyJWT, async (req, res) => {
//   const decodedEmail = req.decoded.email;
//   const email = req.query.email;
//   if (email === decodedEmail) {
//     const query = { email: email };
//     const cursor = ordersCollection.find(query);
//     const orders = await cursor.toArray();
//     res.send(orders);
//   } else {
//     res.status(404).send({ message: "Invalid access" });
//   }
// });
