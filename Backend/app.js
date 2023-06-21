const express = require("express");

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const userRoutes = require("./routes/user");

const expenseRoutes = require("./routes/expense");

const purchaseRoutes = require("./routes/purchase");

const premiumRoutes = require("./routes/premium");

const forgotPasswordRoutes = require("./routes/forgotPassword");

const app = express();

var cors = require("cors");

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);

app.use(expenseRoutes);

app.use(purchaseRoutes);

app.use(premiumRoutes);

app.use(forgotPasswordRoutes);

mongoose
  .connect(process.env.MONGODB)
  .then((result) => {
    console.log("connected");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
