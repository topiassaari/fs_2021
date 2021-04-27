const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (req, res) => {
  const saltRounds = 10;
  const username = req.body.username;
  const password = req.body.password;

  if (!password || !username) {
    res
      .status(400)
      .json({
        error: "username or pasword missing",
      })
      .end();
  } else {
    if (password.length < 3 || username.length < 3) {
      res
        .status(400)
        .json({
          error: "username or pasword too short",
        })
        .end();
    } else {
      const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
      const user = new User({
        username: username,
        name: req.body.name,
        passwordHash,
      });
      const savedUser = await user.save();
      res.json(savedUser);
    }
  }
});
userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { author: 1, likes: 1 });
  res.json(users.map((u) => u.toJSON()));
});

module.exports = userRouter;
