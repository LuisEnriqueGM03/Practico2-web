import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavMenu = () => {
    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/">Dashboard Administrador</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/Dashboard">Inicio</Nav.Link>
                        <NavDropdown title="Personas" id="personas-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/personas">Lista de Personas</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/personas/crear">Crear Persona</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Películas" id="peliculas-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/peliculas">Lista de Películas</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/peliculas/crear">Crear Película</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;
