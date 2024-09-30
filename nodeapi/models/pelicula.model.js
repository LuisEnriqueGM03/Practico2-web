module.exports = (sequelize, Sequelize) => {
    const Pelicula = sequelize.define("pelicula", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sinopsis: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        fechaLanzamiento: {
            type: Sequelize.DATE,
            allowNull: false
        },
        calificacion: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        trailer: {
            type: Sequelize.STRING,
            allowNull: false
        },
        personaId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Pelicula;
}
