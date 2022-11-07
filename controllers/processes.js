const processesRouter = require("express").Router();
const Process = require("../models/process");

// buscar todos los tramites
processesRouter.get("/", (request, response) => {
  Process.find({}).then((processes) => {
    response.json(processes);
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
    .then((process) => {
      if (process) {
        response.json(process);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
  }
});

// buscar tramites por dni
processesRouter.get("/dni/:dni", (request, response, next) => {
    Process.find({dni: request.params.dni})
    .then((process) => {
      if (process) {
        response.json(process);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
  
});

// guarda tramite
processesRouter.post("/", (request, response, next) => {
  const body = request.body;

  if(body.type === "Empresa" || body.type === "Particular" || body.type === "Familiar"){
    const process = new Process({ ...body });

    process
      .save()
      .then((savedProcess) => {
        response.json(savedProcess);
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

  const process = { ...body };

  Process.findByIdAndUpdate(request.params.id, process, { new: true })
    .then((updatedProcess) => {
      response.json(updatedProcess);
    })
    .catch((error) => next(error));
});

module.exports = processesRouter;
