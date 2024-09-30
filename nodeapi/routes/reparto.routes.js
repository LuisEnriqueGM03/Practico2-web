module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/reparto.controller.js");

    router.get('/peliculas/:personaId', controller.getPeliculasByPersonaId);
    router.get('/:peliculaId', controller.getRepartoByPeliculaId);
    router.get('/:peliculaId/:personaId', controller.getRepartoById);
    router.get('/', controller.listRepartos);
    router.post('/', controller.createReparto);
    router.delete('/:peliculaId/:personaId', controller.deleteReparto);

    app.use('/repartos', router);
};
