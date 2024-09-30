module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pelicula.controller.js");

    router.get('/', controller.listPeliculas);
    router.get('/:id', controller.getPeliculaById);
    router.post('/', controller.createPelicula);
    router.put('/:id', controller.updatePelicula);
    router.patch('/:id', controller.partialUpdatePelicula);
    router.delete('/:id', controller.deletePelicula);
    router.post('/:id/imagen', controller.uploadPicture);
    router.get('/personas/:personaId', controller.getPeliculasByPersonaId);

    app.use('/peliculas', router);
};
