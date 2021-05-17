import express from "express";
import cors from "cors";
import diagnosisRouter from "./src/routes/diagnoses";
import patientRouter from "./src/routes/patients";
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("received ping");
  res.send("pong");
});
app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`server: ${PORT}`);
});
