import express from "express";
import toNewPatient from "../utils";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getEntries());
});
router.get("/:id", (req, res) => {
  const patient = patientService.getEntry(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const added = patientService.addPatient(newPatient);
    res.json(added);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;