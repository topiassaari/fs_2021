const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
require("dotenv").config();
const url = process.env.MONGODB_URI;

//connect to server
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to server");
  })
  .catch((error) => {
    console.log("error: ", error.message);
  });

//define person for phonebook
const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true, unique: true },
  number: { type: String, minlength: 8, required: true },
});
personSchema.plugin(uniqueValidator);
//transform the mongoDB id into a more suitable format
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
