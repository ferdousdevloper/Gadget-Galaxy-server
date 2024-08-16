const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dizfzlf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const productsCollection = client.db("gadgetGalaxy").collection("products");

    app.get("/products", async (req, res) => {
      const { page = 1, limit = 10, search = '', brand, category, priceRange, sort } = req.query;

      const query = {};

      if (search) {
        query.model = { $regex: search, $options: 'i' };
      }
      if (brand) query.brand = brand;
      if (category) query.category = category;
      if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        query.price = { $gte: min, $lte: max };
      }

      let sortOptions = {};
      if (sort === 'priceLowToHigh') sortOptions.price = 1;
      if (sort === 'priceHighToLow') sortOptions.price = -1;
      if (sort === 'newest') sortOptions.date = -1;

      try {
        const products = await productsCollection
          .find(query)
          .sort(sortOptions)
          .skip((page - 1) * limit)
          .limit(Number(limit))
          .toArray();

        const total = await productsCollection.countDocuments(query);
        const totalPages = Math.ceil(total / limit);

        res.send({
          products,
          totalPages,
        });
      } catch (err) {
        res.status(500).send({ error: 'Failed to fetch products' });
      }
    });

    app.listen(port, () => {
      console.log(`GADGET GALAXY server is running on port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}
run().catch(console.dir);
