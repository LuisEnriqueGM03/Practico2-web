module.exports = (sequelize, Sequelize) => {
    const Persona = sequelize.define("persona", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    return Persona;
}
