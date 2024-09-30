import axios from "axios";
import {  useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../../../components/NavMenu.jsx";

const FormFotoPersona = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [foto, setFoto] = useState(null);
    const [validated, setValidated] = useState(false);
    const guardarFoto = () => {
        const formData = new FormData();
        formData.append("imagen", foto);

        axios.post(`http://localhost:3000/personas/${id}/imagen`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                console.log("Foto subida:", res.data);
                navigate('/personas');
            })
            .catch(error => {
                console.log("Error al subir la foto:", error);
            });
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (!foto) {
            return;
        }
        guardarFoto();
    };

    const onFileChange = (e) => {
        setFoto(e.target.files[0]);
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4 d-flex justify-content-center">
                <Card className="p-4 fold-big" style={{ width: '500px' }}>
                    <Card.Body>
                        <h2 className="mb-4 text-center">Subir Foto</h2>
                        <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control type="file" onChange={onFileChange} required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor seleccione una foto.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit">
                                    Subir Foto
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
    </>
    );
};

export default FormFotoPersona;
