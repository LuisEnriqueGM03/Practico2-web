import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavMenu from "../../../components/NavMenu.jsx";

const ListaPersonas = () => {
    const [personas, setPersonas] = useState([]);
    const [filteredPersonas, setFilteredPersonas] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getListaPersonas();
        document.title = "Lista de Personas";
    }, []);

    const getListaPersonas = () => {
        axios.get('http://localhost:3000/personas')
            .then(res => {
                setPersonas(res.data);
                setFilteredPersonas(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/personas/${id}`)
            .then(() => {
                getListaPersonas();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const busqueda = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = personas.filter(persona =>
            persona.nombre.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPersonas(filtered);
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4">
                <Card className="p-4 fold-big">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="mb-0">Lista de Personas</h2>
                            <Form.Control className="busqueda" type="text" placeholder="Buscar por nombre" value={search} onChange={busqueda} style={{ maxWidth: '650px' }} />
                            <Button as={Link} to="/personas/crear">
                                <i className="fas fa-plus me-2"></i> Nueva Persona
                            </Button>
                        </div>

                        <Row>
                            {filteredPersonas.map((persona) => (
                                <Col md={3} key={persona.id} className="mb-4">
                                    <Card className="perfil-card fold">
                                        <img className="perfil" src={`http://localhost:3000/personas/${persona.id}.jpg`} alt="" />
                                        <Card.Body className="d-flex flex-column justify-content-between">
                                            <Card.Title className="text-center nombre">{persona.nombre} {persona.apellido}</Card.Title>
                                            <div className="d-flex justify-content-center">
                                                <Button as={Link} to={`/personas/${persona.id}/editar`} variant="primary" className="me-2">
                                                    <i className="fas fa-pencil-alt"></i>
                                                </Button>
                                                <Button as={Link} to={`/personas/${persona.id}/foto`} variant="secondary" className="me-2">
                                                    <i className="fas fa-camera"></i>
                                                </Button>
                                                <Button variant="danger" onClick={() => eliminar(persona.id)}>
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default ListaPersonas;
