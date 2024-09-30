const db = require("../models");
const Reparto = db.repartos;


exports.listRepartos = async (req, res) => {
    try {
        const repartos = await Reparto.findAll(

        );
        res.json(repartos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los repartos.", error });
    }
};

exports.getRepartoById = async (req, res) => {
    const { peliculaId, personaId } = req.params;

    try {
        const reparto = await db.repartos.findOne({
            where: {
                peliculaId: peliculaId,
                personaId: personaId
            }
        });

        if (!reparto) {
            return res.status(404).json({ message: "Reparto no encontrado" });
        }

        res.status(200).json(reparto);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el reparto", error });
    }
};


exports.createReparto = async (req, res) => {
    try {
        const nuevoReparto = await Reparto.create({
            peliculaId: req.body.peliculaId,
            personaId: req.body.personaId
        });
        res.status(201).json(nuevoReparto);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el reparto.", error });
    }
};

exports.deleteReparto = async (req, res) => {
    const { peliculaId, personaId } = req.params;
    try {
        const reparto = await db.repartos.findOne({
            where: {
                peliculaId: peliculaId,
                personaId: personaId
            }
        });
        if (!reparto) {
            return res.status(404).json({ message: "Reparto no encontrado" });
        }
        await reparto.destroy();
        res.status(200).json({ message: "Reparto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el reparto", error });
    }
};

exports.getRepartoByPeliculaId = async (req, res) => {
    const peliculaId = req.params.peliculaId;
    try {
        const reparto = await Reparto.findAll({
            where: { peliculaId },
            attributes: ['personaId']
        });

        res.json(reparto);
    } catch (error) {
        console.error("Error al obtener el reparto:", error);
        res.status(500).json({ message: "Error al obtener el reparto", error });
    }
};

exports.getPeliculasByPersonaId = async (req, res) => {
    const personaId = req.params.personaId;
    try {
        const reparto = await Reparto.findAll({
            where: { personaId },
            attributes: ['peliculaId']
        });
        res.json(reparto);
    } catch (error) {
        console.error("Error al obtener los peliculaId por personaId:", error);
        res.status(500).json({ message: "Error al obtener los peliculaId", error });
    }
};

