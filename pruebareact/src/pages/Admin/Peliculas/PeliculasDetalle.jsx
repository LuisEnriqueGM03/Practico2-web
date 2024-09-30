import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavMenu from "../../../components/NavMenu.jsx";

const DetallesPelicula = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pelicula, setPelicula] = useState(null);
    const [persona, setPersona] = useState(null);
    const [reparto, setReparto] = useState([]);

    useEffect(() => {
        getPeliculaById();
    }, [id]);

    const getPeliculaById = () => {
        axios.get(`http://localhost:3000/peliculas/${id}`)
            .then(res => {
                setPelicula(res.data);
                getPersonaById(res.data.personaId);
                getRepartoByPeliculaId();
            })
            .catch(error => {
                console.log("Error al obtener los detalles de la película:", error);
            });
    };

    const getPersonaById = (personaId) => {
        axios.get(`http://localhost:3000/personas/${personaId}`)
            .then(res => {
                setPersona(res.data);
            })
            .catch(error => {
                console.log("Error al obtener los detalles de la persona:", error);
            });
    };

    const getRepartoByPeliculaId = () => {
        axios.get(`http://localhost:3000/repartos/${id}`)
            .then(res => {
                const personaIds = res.data.map(item => item.personaId);
                getPersonasDetails(personaIds);
            })
            .catch(error => {
                console.log("Error al obtener el reparto:", error);
            });
    };

    const getPersonasDetails = (personaIds) => {
        const promises = personaIds.map(id => axios.get(`http://localhost:3000/personas/${id}`));
        Promise.all(promises)
            .then(responses => {
                const personas = responses.map(res => res.data);
                setReparto(personas);
            })
            .catch(error => {
                console.log("Error al obtener los detalles de las personas:", error);
            });
    };

    const eliminarPelicula = () => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta película?");
        if (confirmDelete) {
            axios.delete(`http://localhost:3000/peliculas/${id}`)
                .then(() => {
                    navigate('/peliculas');
                })
                .catch(error => {
                    console.log("Error al eliminar la película:", error);
                });
        }
    };
    const eliminarDelReparto = (personaId) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar a esta persona del reparto?");
        if (confirmDelete) {
            axios.delete(`http://localhost:3000/repartos/${id}/${personaId}`)
                .then(() => {
                    getRepartoByPeliculaId();
                })
                .catch(error => {
                    console.log("Error al eliminar del reparto:", error);
                });
        }
    };
    if (!pelicula || !persona) {
        return <div>Cargando...</div>;
    }

return (
    <>
        <NavMenu />
        <Container className="mt-4">
            <h1 className="text-center mb-4">{pelicula.nombre}</h1>
            <Card className="mb-4 p-4 fold-big">
                <Card.Body>
                    <div className="d-flex justify-content-center mb-4">
                        <iframe
                            width="100%"
                            height="650"
                            src={pelicula.trailer}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={pelicula.nombre}
                        ></iframe>
                    </div>
                    <Card className="p-4 fold-big">
                        <Row>
                            <Col md={3}>
                                <img
                                    src={`http://localhost:3000/peliculas/${pelicula.id}.jpg`}
                                    alt={`Poster de ${pelicula.nombre}`}
                                    style={{ width: '100%', maxWidth: '250px', height: 'auto' }}
                                />
                            </Col>
                            <Col md={9} className="d-flex flex-column justify-content-center">
                                <h2 className="text-left mb-4 text-center">{pelicula.nombre}</h2>
                                <Card.Body>
                                    <Card.Title className="title-4">Sinopsis</Card.Title>
                                    <Card.Text>{pelicula.sinopsis}</Card.Text>

                                    <Card.Title className="title-4">Fecha de Lanzamiento</Card.Title>
                                    <Card.Text>{new Date(pelicula.fechaLanzamiento).toLocaleDateString()}</Card.Text>

                                    <Card.Title className="title-4">Calificación</Card.Title>
                                    <Card.Text>{pelicula.calificacion}</Card.Text>

                                    <div className="d-flex justify-content-center mt-4">
                                        <Button as={Link} to={`/peliculas/${pelicula.id}/editar`} variant="primary" className="me-3">
                                            <i className="fas fa-pencil-alt me-2"></i> Editar Película
                                        </Button>
                                        <Button as={Link} to={`/peliculas/${pelicula.id}/foto`} variant="secondary" className="me-3">
                                            <i className="fas fa-camera me-2"></i> Cambiar Imagen
                                        </Button>
                                        <Button variant="danger" onClick={eliminarPelicula}>
                                            <i className="fas fa-trash me-2"></i> Eliminar Película
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                    <Row className="mt-4">
                        <Col md={4} >
                            <Card className="p-3 fold-big">
                                <img className="director"
                                    src={`http://localhost:3000/personas/${persona.id}.jpg`}
                                    alt={`${persona.nombre} ${persona.apellido}`}
                                />
                                <Card.Body className="text-center">
                                    <Card.Title className="title-2">{persona.nombre} {persona.apellido}</Card.Title>
                                    <Card.Text>Director</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card className="p-3  fold-big">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h4 className="mb-0">Reparto</h4>
                                        <Button as={Link} to={`/repartos/${pelicula.id}/create`} >
                                            <i className="fas fa-plus me-2"></i> Nuevo Reparto
                                        </Button>
                                    </div>
                                    <Row className="mt-3">
                                        {reparto.map((actor) => (
                                            <Col md={4} key={actor.id} className="mb-3">
                                                <Card className="p-3 reparto-card fold">
                                                    <img className="reparto"
                                                        src={`http://localhost:3000/personas/${actor.id}.jpg`}
                                                        alt={`${actor.nombre} ${actor.apellido}`}
                                                    />
                                                    <Card.Body className="text-center">
                                                        <Card.Title className="title-4">{actor.nombre} {actor.apellido}</Card.Title>
                                                        <Button variant="danger" onClick={() => eliminarDelReparto(actor.id)}>
                                                            <i className="fas fa-trash me-2"></i> Eliminar
                                                        </Button>

                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    </>
);
};

export default DetallesPelicula;
