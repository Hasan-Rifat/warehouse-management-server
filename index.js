const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();

// middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.oter1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const carsCollection = client.db("assignment-11").collection("allCars");

    // get api to read all data
    // http://localhost:5000/inventories

    app.get("/inventories", async (req, res) => {
      const query = {};
      const cursor = carsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // create
    // http://localhost:5000/car
    app.post("/car", async (req, res) => {
      const car = req.body;
      const result = await carsCollection.insertOne(car);
      res.send(result);
    });

    // update
    // http://localhost:5000/car/6270391b3137f9a4cf7d014d
    app.put("/car/:id", async (req, res) => {
      const id = req.params.id;
      const car = req.body;
      console.log("from update api", car);
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      //   console.log("from put method", id);
      const updateDoc = {
        $set: {
          productName: car.productName,
          image: car.image,
          about: car.about,
          price: car.price,
          quantity: car.quantity,
          supplierName: car.supplierName,
        },
      };
      const result = await carsCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // delete
    // http://localhost:5000/car/6270391b3137f9a4cf7d014d
    app.delete("/car/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await carsCollection.deleteOne(filter);
      res.send(result);
    });

    console.log("connected successfully");
  } finally {
  }
}

run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("server running");
});
