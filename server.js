const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const controller = require("./src/Controllers/controllers");

const app = express();

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", true);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:admin@cluster0.jbxvkqf.mongodb.net/`
    );
    app.listen(PORT, () => console.log(`listening port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};
start();

app.use(
  cors({
    origin: ["http://localhost:8080"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/todo", controller.getAll);
app.post("/todo", controller.addTodo);
app.patch("/todo/:id", controller.updateTodo);
app.delete("/todo/:id", controller.deleteTodo);
