import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [clave, setClave] = useState('');
    const navigate = useNavigate();

    const handleClaveChange = (e) => {
        setClave(e.target.value);
    };

    const handleEntrarClick = () => {
        if (clave === 'admin') {
            navigate('/Dashboard');
        } else {
            alert('Clave incorrecta');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card className="p-4 fold" style={{ width: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Bienvenido</h2>
                    <Button as={Link} to="/cartelera" variant="primary" className="w-100 mb-3">
                        Ver Cartelera
                    </Button>
                    <Form>
                        <Form.Group controlId="formClave">
                            <Form.Label className="title-3">Clave</Form.Label>
                            <Form.Control type="password" placeholder="Ingresa la clave" value={clave}
                                onChange={handleClaveChange}
                            />
                        </Form.Group>
                        <Button  className="w-100 mt-3" onClick={handleEntrarClick}>
                            Entrar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default App;
