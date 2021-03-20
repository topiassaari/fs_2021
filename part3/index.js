const express = require("express");
var morgan = require("morgan");
const cors = require("cors");
morgan.token("content", function (req, res) {
  return JSON.stringify(req.body);
});
const app = express();
app.use(express.json());
app.use(express.static("build"));
app.use(morgan(":method :url :response-time :content"));
app.use(cors());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/info", (req, res) => {
  var info =
    "<p>Phonebook has info for " + persons.length + "</p> <p>" + Date();
  res.send(info);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

const randomID = () => {
  const min = Math.ceil(1);
  const max = Math.floor(1000);
  const newID = Math.floor(Math.random() * (max - min) + min);
  while (persons.find((person) => person.id === newID)) {
    newID = Math.floor(Math.random() * (max - min) + min);
  }
  return newID;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Please fill name and number",
    });
  }

  persons.forEach((person) => {
    if (person.name === body.name) {
      return res.status(400).json({
        error: "Name must be unique",
      });
    }
  });
  const person = {
    name: body.name,
    number: body.number,
    id: randomID(),
  };
  persons = persons.concat(person);
  res.json(person);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(204).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
