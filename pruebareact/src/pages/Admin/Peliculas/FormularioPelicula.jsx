import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { getVideoId } from "../../utils/youtubeUtils.js";
import NavMenu from "../../../components/NavMenu.jsx";

const FormPelicula = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [fechaLanzamiento, setFechaLanzamiento] = useState('');
    const [calificacion, setCalificacion] = useState('');
    const [trailer, setTrailer] = useState('');
    const [personaId, setPersonaId] = useState('');
    const [personas, setPersonas] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getPeliculaById();
        }
        getPersonas();
    }, [id]);

    const getPeliculaById = () => {
        axios.get(`http://localhost:3000/peliculas/${id}`)
            .then(res => {
                const pelicula = res.data;
                setNombre(pelicula.nombre);
                setSinopsis(pelicula.sinopsis);
                setFechaLanzamiento(moment(pelicula.fechaLanzamiento).format('YYYY-MM-DD'));
                setCalificacion(pelicula.calificacion);
                setTrailer(pelicula.trailer);
                setPersonaId(pelicula.personaId);
            })
            .catch(error => {
                console.log("Error al obtener la película:", error);
            });
    };

    const getPersonas = () => {
        axios.get('http://localhost:3000/personas')
            .then(res => {
                setPersonas(res.data);
            })
            .catch(error => {
                console.log("Error al obtener la lista de personas:", error);
            });
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const videoId = getVideoId(trailer);

        const pelicula = {
            nombre,
            sinopsis,
            fechaLanzamiento,
            calificacion,
            trailer: videoId ? `https://www.youtube.com/embed/${videoId}` : trailer,
            personaId
        };

        if (id) {
            editPelicula(pelicula);
        } else {
            insertPelicula(pelicula);
        }
    };

    const editPelicula = (pelicula) => {
        axios.put(`http://localhost:3000/peliculas/${id}`, pelicula)
            .then(res => {
                console.log("Película actualizada:", res.data);
                navigate(`/peliculas/${id}/detalle`);
            })
            .catch(error => {
                console.log("Error al actualizar la película:", error);
            });
    };

    const insertPelicula = (pelicula) => {
        axios.post('http://localhost:3000/peliculas', pelicula)
            .then(res => {
                console.log("Película creada:", res.data);
                navigate('/peliculas');
            })
            .catch(error => {
                console.log("Error al crear la película:", error);
            });
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4 d-flex justify-content-center">
                <Card className="p-4 fold-big" style={{ width: '500px' }}>
                    <Card.Body>
                        <h2 className="mb-4 text-center">{id ? "Editar Película" : "Crear Película"}</h2>
                        <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group controlId="formNombre" className="mb-3">
                                <Form.Label className="title-2">Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ingresa el nombre" value={nombre}
                                              onChange={(e) => setNombre(e.target.value)}
                                              required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un nombre.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formSinopsis" className="mb-3">
                                <Form.Label className="title-2">Sinopsis</Form.Label>
                                <Form.Control as="textarea" placeholder="Ingresa la sinopsis" value={sinopsis}
                                              onChange={(e) => setSinopsis(e.target.value)}
                                              required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese una sinopsis.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formFechaLanzamiento" className="mb-3">
                                <Form.Label className="title-2">Fecha de Lanzamiento</Form.Label>
                                <Form.Control type="date" value={fechaLanzamiento}
                                              onChange={(e) => setFechaLanzamiento(e.target.value)}
                                              required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese una fecha de lanzamiento.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formCalificacion" className="mb-3">
                                <Form.Label className="title-2">Calificación</Form.Label>
                                <Form.Control type="number" step="0.1" min="0" max="10" placeholder="Ingresa la calificación" value={calificacion}
                                              onChange={(e) => setCalificacion(e.target.value)}
                                              required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese una calificación válida.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formTrailer" className="mb-3">
                                <Form.Label className="title-2">Trailer (URL)</Form.Label>
                                <Form.Control type="url" placeholder="Ingresa la URL del trailer" value={trailer}
                                              onChange={(e) => setTrailer(e.target.value)}
                                              required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese una URL válida.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formPersonaId" className="mb-3">
                                <Form.Label className="title-2">Persona Responsable</Form.Label>
                                <Form.Control as="select" value={personaId} onChange={(e) => setPersonaId(e.target.value)} required>
                                    <option value="">Seleccione una persona...</option>
                                    {personas.map(persona => (
                                        <option key={persona.id} value={persona.id}>{persona.nombre} {persona.apellido}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Por favor seleccione una persona.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit">
                                    {id ? "Guardar Cambios" : "Guardar Película"}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default FormPelicula;
