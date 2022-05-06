const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Invalid authorization" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Invalid access" });
    }
    console.log("decoded", decoded);
    req.decoded = decoded;
    next();
  });
  // console.log("inside verifyJWT", authHeader);
}

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

    // const carsCollection = client.db("assignment-11").collection("allCars");
    const ordersCollection = client.db("assignment-11").collection("order");

    // token api
    // http://localhost:5000/login
    app.post("/login", (req, res) => {
      const user = req.body;
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res.send({ accessToken });
    });

    // get api to read all data
    // http://localhost:5000/inventories

    app.get("/inventories", async (req, res) => {
      const query = {};
      const cursor = ordersCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // car details
    app.get("/car/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await ordersCollection.findOne(filter);
      res.send(result);
    });

    // create
    // order collection api
    // http://localhost:5000/order

    app.get("/order", verifyJWT, async (req, res) => {
      const decodedEmail = req.decoded.email;
      const email = req.query.email;
      if (email === decodedEmail) {
        const query = { email: email };
        const cursor = ordersCollection.find(query);
        const orders = await cursor.toArray();
        res.send(orders);
      } else {
        res.status(404).send({ message: "Invalid access" });
      }
    });

    app.post("/order", async (req, res) => {
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

    // full update start
    // http://localhost:5000/car/6270391b3137f9a4cf7d014d
    /*  app.put("/car/:id", async (req, res) => {
      const id = req.params.id;
      const car = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
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
    }); */

    // only car quantity
    // http://localhost:5000/car/:id/quantity

    app.put("/car/:id", async (req, res) => {
      const id = req.params.id;
      const car = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity: car.quantity,
        },
      };
      const result = await ordersCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // update end

    // delete
    // http://localhost:5000/car/6270391b3137f9a4cf7d014d
    app.delete("/car/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await ordersCollection.deleteOne(query);
      res.send(result);
    });
    // delete quantity

    app.delete("/car/:id/quantity", async (req, res) => {
      const id = req.params.id;
      const car = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity: car.quantity,
        },
      };
      const result = await ordersCollection.updateOne(
        filter,
        updateDoc,
        options
      );
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
