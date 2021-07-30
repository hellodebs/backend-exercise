const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Book = require("./models/book");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/books", (req, res) => {
  Book.find()
    .then((data) => {
      res.send(data);
    })
    .catch(() => res.send("Book not found"));
});

app.post("/api/books", (req, res) => {
  Book.create(req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => res.status(400).send("There was a mistake"));
});

app.patch("/api/books/:id", (req, res) => {
  const id = req.params.id;
  const content = req.body;
  Book.findByIdAndUpdate(id, content, { new: true })
    .then((data) => {
      if (!data) {
        throw "Book was not found";
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.delete("/api/books/:id", (req, res) => {
  const id = req.params.id;
  Book.findOneAndDelete(id)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.status(400).end();
    });
});

mongoose
  .connect("mongodb://localhost:27017/books-api", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("conntected to mongo");
    app.listen(4001, () => {
      console.log("Listening on http://localhost:4001");
    });
  })
  .catch((error) => {
    console.error(error);
  });
