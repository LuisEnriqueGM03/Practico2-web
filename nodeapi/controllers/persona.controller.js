const db = require("../models");
const Persona = db.personas;

exports.listPersonas = async (req, res) => {
    try {
        const personas = await Persona.findAll();
        res.json(personas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las personas.", error });
    }
};

exports.getPersonaById = async (req, res) => {
    const id = req.params.id;
    try {
        const persona = await Persona.findByPk(id);
        if (!persona) {
            return res.status(404).json({ message: "Persona no encontrada." });
        }
        res.json(persona);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la persona.", error });
    }
};

exports.createPersona = async (req, res) => {
    try {
        const nuevaPersona = await Persona.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido
        });
        res.status(201).json(nuevaPersona);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la persona.", error });
    }
};

exports.updatePersona = async (req, res) => {
    const id = req.params.id;
    try {
        const persona = await Persona.findByPk(id);
        if (!persona) {
            return res.status(404).json({ message: "Persona no encontrada." });
        }
        persona.nombre = req.body.nombre;
        persona.apellido = req.body.apellido;
        await persona.save();
        res.json(persona);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la persona.", error });
    }
};

exports.partialUpdatePersona = async (req, res) => {
    const id = req.params.id;
    try {
        const persona = await Persona.findByPk(id);
        if (!persona) {
            return res.status(404).json({ message: "Persona no encontrada." });
        }
        persona.nombre = req.body.nombre || persona.nombre;
        persona.apellido = req.body.apellido || persona.apellido;
        await persona.save();
        res.json(persona);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la persona.", error });
    }
};

exports.deletePersona = async (req, res) => {
    const id = req.params.id;
    try {
        const persona = await Persona.findByPk(id);
        if (!persona) {
            return res.status(404).json({ message: "Persona no encontrada." });
        }
        await persona.destroy();
        res.json({ message: "Persona eliminada correctamente." });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la persona.", error });
    }
};

exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const persona = await getPersonaOr404(id, res);
        if (!persona) {
            return;
        }
        if (!req.files || !req.files.imagen) {
            res.status(400).json({
                msg: 'No se ha enviado el archivo'
            });
            return;
        }
        const file = req.files.imagen;
        const fileName = persona.id + '.jpg';
        file.mv(`public/personas/${fileName}`, (err) => {
            if (err) {
                console.error("Error al mover el archivo:", err);
                return res.status(500).json({
                    msg: 'Error al subir la imagen'
                });
            }
            res.json(persona);
        });
    } catch (error) {
        console.error("Error en el controlador uploadPicture:", error);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};
async function getPersonaOr404(id, res) {
    const persona = await Persona.findByPk(id);
    if (!persona) {
        res.status(404).json({
            msg: 'Persona no encontrada'
        });
        return null;
    }
    return persona;
}