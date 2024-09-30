import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../../../components/NavMenu.jsx";

const FormPersona = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getPersonaById();
    }, [id]);
    const getPersonaById = () => {
        axios.get(`http://localhost:3000/personas/${id}`)
            .then(res => {
                const persona = res.data;
                setNombre(persona.nombre);
                setApellido(persona.apellido);
            })
            .catch(error => {
                console.log(error);
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
        const persona = {
            nombre,
            apellido
        };
        if (id) {
            editPersona(persona);
        } else {
            insertPersona(persona);
        }
    };
    const editPersona = (persona) => {
        axios.put(`http://localhost:3000/personas/${id}`, persona)
            .then(res => {
                console.log("Persona actualizada:", res.data);
                navigate('/personas');
            })
            .catch(error => {
                console.log("Error al actualizar la persona:", error);
            });
    };

    const insertPersona = (persona) => {
        axios.post('http://localhost:3000/personas', persona)
            .then(res => {
                console.log("Persona creada:", res.data);
                navigate('/personas');
            })
            .catch(error => {
                console.log("Error al crear la persona:", error);
            });
    };
    return (
        <>
            <NavMenu />
            <Container className="mt-4 d-flex justify-content-center">
                <Card className="p-4 fold-big" style={{ width: '500px' }}>
                    <Card.Body>
                        <h2 className="mb-4 text-center">{id ? "Editar Persona" : "Crear Persona"}</h2>
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

                            <Form.Group controlId="formApellido" className="mb-3">
                                <Form.Label className="title-2">Apellido</Form.Label>
                                <Form.Control type="text" placeholder="Ingresa el apellido" value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un apellido.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit">
                                    {id ? "Guardar Cambios" : "Guardar Persona"}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
    export default FormPersona;
