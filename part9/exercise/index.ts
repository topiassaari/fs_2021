import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (_req, res) => {
  res.send(calculateBmi(Number(_req.query.height), Number(_req.query.weight)));
});

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    throw new Error("parameters missing");
  }
  if (!isNaN(Number(target)) && Array.isArray(daily_exercises)) {
    try {
      const result = calculateExercise(target, daily_exercises);
      res.send(result);
    } catch (e) {
      console.log(e);
    }
  } else {
    throw new Error("malformatted parameters");
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
