const express = require("express");

const uuidv4 = require("uuid").v4;

const app = express();

const host = "localhost";

const port = 4000;

// Person: { id: string, name: string, birthDate: string }
const persons = [];

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/persons", (req, res) => {
  res.status(200).json({ result: { persons } });
});

app.get("/persons/:id", (req, res) => {
  const { id } = req.params;

  const person = persons.find((person) => person.id === id);

  if (!person) {
    return res.status(404).json({ error: { message: "Person not found" } });
  }

  return res.status(200).json({ result: { person } });
});

app.put("/persons/:id", (req, res) => {
  const { id } = req.params;
  const { name, birthDate, job } = req.body;

  if (!name || !birthDate || !job) {
    return res
      .status(400)
      .json({ error: { message: "Missing required fields" } });
  }

  const person = persons.find((person) => person.id === id);
  person.name = name;
  person.birthDate = birthDate;
  person.job = job;

  return res.status(200).json({ result: { person } });
});

app.post("/persons", (req, res) => {
  const { name, birthDate, job } = req.body;

  if (!name || !birthDate) {
    return res
      .status(400)
      .json({ error: { message: "Missing required fields" } });
  }

  const person = { id: uuidv4(), name, birthDate, job };

  persons.push(person);

  return res.status(201).json({ result: { person } });
});

app.patch("/persons/:id", (req,res) => {
    const { id } = req.params;

    const { name, birthDate, job } = req.body;

    const person = persons.find((person) => person.id === id);

    if(!person){
        return res.status(404).json({ error: { message: "Person not found" } });
    }

    if(name){
        person.name = name;
    }

    if(birthDate){
        person.birthDate = birthDate;
    }

    if(job){
        person.job = job;
    }

    return res.status(200).json({ result: { person } });
})

app.delete("/persons/:id",(req, res) => {
    const { id} = req.params;

    const person = persons.find((person) => person.id === id);

    if(!person){
        return res.status(404).json({ error: { message: "Person not found" } });
    }

    const index = persons.indexOf(person);

    persons.splice(index, 1);

    return res.status(204).end()
})

app.use((req, res) => {
  return res.status(501).json({ error: { message: "Not implemented" } });
});

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
