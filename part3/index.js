//imports
const Person = require("./models/persons");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

morgan.token("content", function (req) {
  return JSON.stringify(req.body);
});
//set up express
app.use(express.json());
app.use(express.static("build"));
app.use(morgan(":method :url :response-time :content"));
app.use(cors());

//handle errors
const errorHandler = (error, _req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

//get info of phonebook
app.get("/info", (req, res) => {
  Person.find({})
    .then((persons) => {
      res.send(
        `Phonebook has info for ${persons.length} people on the date: ${Date()}`
      );
    })
    // eslint-disable-next-line no-undef
    .catch((error) => next(error));
});

//get all
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons.map(person => person.toJSON()));
  });
});

//get one person
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person.toJSON());
    })
    .catch((error) => next(error));
});

//post a new person
app.post("/api/persons", (req, res, next) => {
  const requestBody = req.body;
  const name = requestBody.name;
  const number = requestBody.number;
  if ((name || number) === undefined) {
    return res.status(400).json({ error: "name or number missing" });
  }
  const person = new Person({
    name: name,
    number: number,
  });
  person
    .save()
    .then((saved) => {
      res.json(saved.toJSON());
    })
    .catch((error) => next(error));
});

//support update
app.put("/api/notes/:id", (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true },{ runValidators: true, context: "query" })
    .then((updated) => {
      res.json(updated.toJSON());
    })
    .catch((error) => next(error));
});

//delete person
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.use(errorHandler);
//listen for changes
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
