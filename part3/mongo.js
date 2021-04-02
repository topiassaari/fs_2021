const mongoose = require("mongoose");
require("dotenv").config();

if (process.argv.length < 3) {
  console.log("provide password as argument");
  process.exit(1);
}

// eslint-disable-next-line no-unused-vars
const password = process.argv[2];

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({
    name: name,
    number: number,
  });
  person.save().then(() => {
    console.log(`added ${name}, number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook: ");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  console.log("wrong number of arguments");
  console.log(process.argv.length);
  process.exit(1);
}
