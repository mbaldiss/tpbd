const personsRouter = require("express").Router();
const Person = require("../models/person");

// buscar todas las personas
personsRouter.get("/", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// buscar persona por id
personsRouter.get("/id/:id", async (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// buscar persona por dni
personsRouter.get("/dni/:dni", async (request, response, next) => {
  Person.find({dni: request.params.dni})
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});


// agregar persona
personsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const result = await Person.find({ dni: request.body.dni });
  if (result.length === 0) {
    const person = new Person({ ...body });

    person
      .save()
      .then((savedPerson) => {
        response.json(savedPerson);
      })
      .catch((error) => next(error));
  } else {
    response.status(404).send("DNI existente.");
  }
});

// borrar persona por id
personsRouter.delete("/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// modifica persona por id
personsRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const person = { ...body };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

module.exports = personsRouter;
