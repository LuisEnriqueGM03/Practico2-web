const db = require("../models");
const Pelicula = db.peliculas;
const fs = require('fs');


exports.listPeliculas = async (req, res) => {
    try {
        const peliculas = await Pelicula.findAll();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las películas.", error });
    }
};

exports.getPeliculaById = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({ message: "Película no encontrada." });
        }
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la película.", error });
    }
};

exports.createPelicula = async (req, res) => {
    try {
        const nuevaPelicula = await Pelicula.create({
            nombre: req.body.nombre,
            sinopsis: req.body.sinopsis,
            fechaLanzamiento: req.body.fechaLanzamiento,
            calificacion: req.body.calificacion,
            trailer: req.body.trailer,
            personaId: req.body.personaId
        });
        res.status(201).json(nuevaPelicula);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la película.", error });
    }
};

exports.updatePelicula = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({ message: "Película no encontrada." });
        }
        pelicula.nombre = req.body.nombre;
        pelicula.sinopsis = req.body.sinopsis;
        pelicula.fechaLanzamiento = req.body.fechaLanzamiento;
        pelicula.calificacion = req.body.calificacion;
        pelicula.trailer = req.body.trailer;
        pelicula.personaId = req.body.personaId;
        await pelicula.save();
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la película.", error });
    }
};

exports.partialUpdatePelicula = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({ message: "Película no encontrada." });
        }
        pelicula.nombre = req.body.nombre || pelicula.nombre;
        pelicula.sinopsis = req.body.sinopsis || pelicula.sinopsis;
        pelicula.fechaLanzamiento = req.body.fechaLanzamiento || pelicula.fechaLanzamiento;
        pelicula.calificacion = req.body.calificacion || pelicula.calificacion;
        pelicula.trailer = req.body.trailer || pelicula.trailer;
        pelicula.personaId = req.body.personaId || pelicula.personaId;
        await pelicula.save();
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la película.", error });
    }
};

exports.deletePelicula = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({ message: "Película no encontrada." });
        }
        await pelicula.destroy();
        res.json({ message: "Película eliminada correctamente." });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la película.", error });
    }
};

exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await getPeliculaOr404(id, res);
        if (!pelicula) {
            return;
        }
        if (!req.files || !req.files.imagen) {
            res.status(400).json({
                msg: 'No se ha enviado el archivo'
            });
            return;
        }
        const file = req.files.imagen;
        const fileName = pelicula.id + '.jpg';
        file.mv(`public/peliculas/${fileName}`, (err) => {
            if (err) {
                console.error("Error al mover el archivo:", err);
                return res.status(500).json({
                    msg: 'Error al subir la imagen'
                });
            }
            res.json(pelicula);
        });
    } catch (error) {
        console.error("Error en el controlador uploadPicture:", error);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};
async function getPeliculaOr404(id, res) {
    const pelicula = await Pelicula.findByPk(id);
    if (!pelicula) {
        res.status(404).json({
            msg: 'Persona no encontrada'
        });
        return null;
    }
    return pelicula;
}

exports.getPeliculasByPersonaId = async (req, res) => {
    const personaId = req.params.personaId;
    try {
        const peliculas = await Pelicula.findAll({
            where: { personaId: personaId },
            attributes: ['id', 'nombre']
        });

        res.json(peliculas);
    } catch (error) {
        console.error("Error al obtener las películas:", error);
        res.status(500).json({ message: "Error al obtener las películas", error });
    }
};