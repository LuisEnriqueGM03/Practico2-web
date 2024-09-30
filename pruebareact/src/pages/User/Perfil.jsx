import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

const PerfilPersona = () => {
    const { id } = useParams();
    const [persona, setPersona] = useState(null);
    const [peliculasComoDirector, setPeliculasComoDirector] = useState([]);
    const [peliculasComoActor, setPeliculasComoActor] = useState([]);

    useEffect(() => {
        getPersonaById();
        getPeliculasRelacionadas();
    }, [id]);

    const getPersonaById = () => {
        axios.get(`http://localhost:3000/personas/${id}`)
            .then(res => {
                setPersona(res.data);
            })
            .catch(error => {
                console.log("Error al obtener los detalles de la persona:", error);
            });
    };

    const getPeliculasRelacionadas = () => {
        axios.get(`http://localhost:3000/peliculas/personas/${id}`)
            .then(res => {
                setPeliculasComoDirector(res.data);
            })
            .catch(error => {
                console.log("Error al obtener las películas como Director:", error);
            });

        axios.get(`http://localhost:3000/repartos/peliculas/${id}`)
            .then(res => {
                const peliculaIds = res.data.map(item => item.peliculaId);
                getPeliculasDetails(peliculaIds);
            })
            .catch(error => {
                console.log("Error al obtener las películas como Actor:", error);
            });
    };

    const getPeliculasDetails = (peliculaIds) => {
        const promises = peliculaIds.map(peliculaId =>
            axios.get(`http://localhost:3000/peliculas/${peliculaId}`)
                .then(res => ({ id: res.data.id, nombre: res.data.nombre, imagen: res.data.imagen }))
        );
        Promise.all(promises)
            .then(peliculas => {
                setPeliculasComoActor(peliculas);
            })
            .catch(error => {
                console.log("Error al obtener los detalles de las películas como Actor:", error);
            });
    };

    if (!persona) {
        return <div>Cargando...</div>;
    }

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">{persona.nombre} {persona.apellido}</h1>
            <Card className="mb-4 p-4 fold-big">
                <Card.Body>
                    <Row>
                        <Col md={4}>
                            <Card className="p-3 fold-big">
                                <img className="director"
                                     src={`http://localhost:3000/personas/${persona.id}.jpg`}
                                     alt={`${persona.nombre} ${persona.apellido}`}
                                />
                                <Card.Body className="text-center">
                                    <Card.Title className="title-2">{persona.nombre} {persona.apellido}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={8}>
                            <Card className="p-3 fold-big">
                                <Card.Body>
                                    <h4 className="mb-4">Películas Relacionadas</h4>
                                    <h5 className="mb-3">Director</h5>
                                    <Row className="mt-3">
                                        {peliculasComoDirector.length === 0 ? (
                                            <p className="text-center">No hay películas de director</p>
                                        ) : (
                                            peliculasComoDirector.map((pelicula) => (
                                                <Col md={4} key={pelicula.id} className="mb-3">
                                                    <Card as={Link} to={`/carteleraDetalle/${pelicula.id}`} className="p-3 reparto-card fold peli-card" style={{ cursor: 'pointer' }}>
                                                        <img className="pelicula-perfil"
                                                             src={`http://localhost:3000/peliculas/${pelicula.id}.jpg`}
                                                        />
                                                        <Card.Body className="text-center">
                                                            <Card.Title className="title-4">{pelicula.nombre}</Card.Title>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))
                                        )}
                                    </Row>

                                    <h5 className="mb-3 mt-5">Actor</h5>
                                    <Row className="mt-3">
                                        {peliculasComoActor.length === 0 ? (
                                            <p className="text-center">No hay películas de actor</p>
                                        ) : (
                                            peliculasComoActor.map((pelicula) => (
                                                <Col md={4} key={pelicula.id} className="mb-3">
                                                    <Card as={Link} to={`/carteleraDetalle/${pelicula.id}`} className="p-3 reparto-card fold peli-card" style={{ cursor: 'pointer' }}>
                                                        <img className="pelicula-perfil"
                                                             src={`http://localhost:3000/peliculas/${pelicula.id}.jpg`}
                                                        />
                                                        <Card.Body className="text-center">
                                                            <Card.Title className="title-4">{pelicula.nombre}</Card.Title>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))
                                        )}
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PerfilPersona;
