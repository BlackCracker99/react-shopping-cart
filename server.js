const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/react-shopping-cart-db" , {
    useNewUrlParser : true , 
    useCreateIndex : true , 
    useUnifiedTopology : true ,
});

//product table
const Product = mongoose.model(
    "products",
    new mongoose.Schema({
      _id: { type: String, default: shortid.generate },
      title: String,
      description: String,
      image: String,
      price: Number,
      availableSizes: [String],
    })
  );
//get products from table
app.get("/api/products" , async(req , res) => {
    const products = await Product.find({});
    res.send(products);
});

//create new product
app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

//delete product
app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});

//create server and define port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));