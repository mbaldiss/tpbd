const processesRouter = require("express").Router();
const Process = require("../models/process");

// buscar todos los tramites
processesRouter.get("/", (request, response) => {
  Process.find({}).then((persons) => {
    response.json(persons);
  });
});

// buscar tramite por id
processesRouter.get("/:id", (request, response, next) => {
  if(request.params.id === "type"){
    Process.distinct("type")
    .then((type) => {
      if (type) {
        response.json(type);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
  }else{
    Process.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
  }
});

// guarda tramite
processesRouter.post("/", (request, response, next) => {
  const body = request.body;

  if(body.type === "Empresa" || body.type === "Particular" || body.type === "Familiar"){
    const person = new Process({ ...body });

    person
      .save()
      .then((savedPerson) => {
        response.json(savedPerson);
      })
      .catch((error) => next(error));
  }else{
    response.status(404).send("tipo de tramite invalido");
  }

});

// borra tramite por id
processesRouter.delete("/:id", (request, response, next) => {
  Process.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// modifica tramite por id
processesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const person = { ...body };

  Process.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

module.exports = processesRouter;
