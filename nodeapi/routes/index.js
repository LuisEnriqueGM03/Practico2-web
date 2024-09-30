module.exports = app => {
    require('./persona.routes')(app);
    require('./pelicula.routes')(app);
    require('./reparto.routes')(app);
};
