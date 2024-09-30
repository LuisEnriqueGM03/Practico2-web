import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

const ListaPeliculas = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [filteredPeliculas, setFilteredPeliculas] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getListaPeliculas();
        document.title = "Lista de Películas";
    }, []);

    const getListaPeliculas = () => {
        axios.get('http://localhost:3000/peliculas')
            .then(res => {
                const peliculasOrdenadas = res.data.sort((a, b) => b.calificacion - a.calificacion); // Ordenar por calificación
                setPeliculas(peliculasOrdenadas);
                setFilteredPeliculas(peliculasOrdenadas);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = peliculas.filter(pelicula =>
            pelicula.nombre.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPeliculas(filtered);
    };

    const handleCardClick = (id) => {
        navigate(`/carteleraDetalle/${id}`);
    };

    return (
        <Container className="mt-4">
            <Card className="p-4 fold-big">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="mb-0">Lista de Películas</h2>
                        <Form.Control
                            className="busqueda"
                            type="text"
                            placeholder="Buscar por nombre"
                            value={search}
                            onChange={handleSearch}
                            style={{ maxWidth: '650px', marginLeft: 'auto' }}
                        />
                    </div>

                    <Row>
                        {filteredPeliculas.map((pelicula) => (
                            <Col md={3} key={pelicula.id} className="mb-4">
                                <Card className="peli-card fold" onClick={() => handleCardClick(pelicula.id)} style={{ cursor: 'pointer' }}>
                                    <img className="pelicula" src={`http://localhost:3000/peliculas/${pelicula.id}.jpg`} alt="" />
                                    <Card.Body className="d-flex flex-column justify-content-between">
                                        <Card.Title className="text-center nombre">{pelicula.nombre}</Card.Title>
                                        <Card.Text className="text-center">Calificación: {pelicula.calificacion}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ListaPeliculas;
