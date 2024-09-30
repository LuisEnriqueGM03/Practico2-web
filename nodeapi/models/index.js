const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.personas = require("./persona.model.js")(sequelize, Sequelize);
db.peliculas = require("./pelicula.model.js")(sequelize, Sequelize);
db.repartos = require("./reparto.model.js")(sequelize, Sequelize);


db.personas.hasMany(db.peliculas, { as: "peliculas" });
db.peliculas.belongsTo(db.personas, {
    foreignKey: "personaId",
    as: "persona",
});

db.peliculas.belongsToMany(db.personas, {
    through: db.repartos,
    foreignKey: "peliculaId",
    as: "actores"
});

db.personas.belongsToMany(db.peliculas, {
    through: db.repartos,
    foreignKey: "personaId",
    as: "peliculasReparto"
});

module.exports = db;
