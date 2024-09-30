module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/persona.controller.js");


    router.get('/', controller.listPersonas);
    router.get('/:id', controller.getPersonaById);
    router.post('/', controller.createPersona);
    router.put('/:id', controller.updatePersona);
    router.patch('/:id', controller.partialUpdatePersona);
    router.delete('/:id', controller.deletePersona);
    router.post('/:id/imagen', controller.uploadPicture);


    app.use('/personas', router);
};
