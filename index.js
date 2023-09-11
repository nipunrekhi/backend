const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productsRouter = require("./routes/Product");
const brandsRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Category");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");

//Middlewares
const server = express();
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  }),
);
server.use(express.json());

server.use("/products", productsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/user", userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", orderRouter.router);

//Databse Connection

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("database connected");
}

server.get("/", (req, res) => {
  return res.send("Hello World");
});

server.listen(8080, () => {
  console.log("server started");
});
