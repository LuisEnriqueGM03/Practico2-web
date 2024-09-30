module.exports = (sequelize, Sequelize) => {
    const Reparto = sequelize.define("reparto", {
        peliculaId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        personaId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Reparto;
}