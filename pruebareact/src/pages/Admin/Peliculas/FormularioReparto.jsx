import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../../../components/NavMenu.jsx";

const FormReparto = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [personaId, setPersonaId] = useState('');
    const [personas, setPersonas] = useState([]);
    const [reparto, setReparto] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        getPersonas();
        getReparto();
    }, []);

    const getPersonas = () => {
        axios.get('http://localhost:3000/personas')
            .then(res => {
                setPersonas(res.data);
            })
            .catch(error => {
                console.log("Error al obtener la lista de personas:", error);
            });
    };

    const getReparto = () => {
        axios.get(`http://localhost:3000/repartos/${id}`)
            .then(res => {
                setReparto(res.data);
            })
            .catch(error => {
                console.log("Error al obtener el reparto:", error);
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

        const repartoData = {
            personaId,
            peliculaId: id
        };

        insertReparto(repartoData);
    };

    const insertReparto = (repartoData) => {
        axios.post(`http://localhost:3000/repartos/`, repartoData)
            .then(res => {
                console.log("Reparto agregado:", res.data);
                navigate(`/peliculas/${id}/detalle`);
            })
            .catch(error => {
                console.log("Error al agregar el reparto:", error);
            });
    };

    const personasFiltradas = personas.filter(persona =>
        !reparto.some(repartoItem => repartoItem.personaId === persona.id)
    );

    return (
        <>
            <NavMenu />
            <Container className="mt-4 d-flex justify-content-center">
                <Card className="p-4 fold-big" style={{ width: '500px' }}>
                    <Card.Body>
                        <h2 className="mb-4 text-center">Agregar Reparto</h2>
                        <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group controlId="formPersonaId" className="mb-3">
                                <Form.Label className="title-2">Seleccionar Persona</Form.Label>
                                <Form.Control as="select" value={personaId} onChange={(e) => setPersonaId(e.target.value)} required>
                                    <option value="">Seleccione una persona</option>
                                    {personasFiltradas.map(persona => (
                                        <option key={persona.id} value={persona.id}>
                                            {persona.nombre} {persona.apellido}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Por favor seleccione una persona.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit">
                                    Guardar Reparto
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default FormReparto;
