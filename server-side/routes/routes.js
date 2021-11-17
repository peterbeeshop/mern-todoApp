//imports
const express = require("express");
const routes = express.Router();
const Todo = require("../model/model");

//route for getting all todos in the db
routes.get("/", (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(todos);
    }
  });
});

//route for getting a specified todo
routes.get("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById({ _id: id }, (err, todo) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(todo);
    }
  });
});

//creating and saving a todo to db
routes.post("/", (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    body: req.body.body,
  });
  todo
    .save()
    .then(res.redirect("http://localhost:3000"))
    .catch(console.log("error saving todo"));
});

//updating a todo
routes.put("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndUpdate(
    { _id: id },
    { title: req.body.title, body: req.body.body },
    (err, todo) => {
      try {
        if (err) {
          res.send(err);
        } else if (todo) {
          res.send(todo);
        }
      } catch (err) {
        res.send(err.message);
      }
    }
  );
});

//deleting a todo
routes.delete("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete({ _id: id }, (err, todo) => {
    if (err) {
      res.send("err deleting todo");
    }
    if (todo) {
      res.send("deleted todo");
    }
  });
});

module.exports = routes;
