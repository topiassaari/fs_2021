const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (req, res) => {
  const body = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });
  const savedUser = await user.save();
  res.json(savedUser);
});
userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { author: 1, likes: 1 });
  res.json(users.map((u) => u.toJSON()));
});

module.exports = userRouter;
