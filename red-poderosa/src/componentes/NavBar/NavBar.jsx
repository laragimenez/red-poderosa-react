import 'bootstrap/dist/css/bootstrap.min.css'; //importamos la hoja de stylo de bootstrap
import './NavBar.css'; //esta abajo de la libreria bootstrap por que tomamos la prioridad del estilo de bootstrap pero se puede cambiar el estilo, es en forma cascada.

import React, { useEffect } from 'react';
import Container  from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    
    
    const handleLogout = () => {
        // Eliminar los datos del localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token"); // Si usas un token de autenticación
    
        // Redirigir al login
        navigate("/"); 
    };
    
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg">
            <Container>
                <Navbar.Brand href="home">
                        <img 
                            src="/Logo.ico" 
                            alt="Logo" 
                            style={{ width: '40px', height: '40px', marginRight: '10px' }} // Puedes ajustar el tamaño y los márgenes
                        />
                        Red Poderosa
                    </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {token && (
                            <>
                            <Nav.Link href="/movies">Movies</Nav.Link>
                            <Nav.Link href="/genres">Genres</Nav.Link>
                            <Nav.Link href="/users">Users</Nav.Link>
                            </>
                        )}
                    </Nav>
                    {token && (
                        <Button variant="outline-light" onClick={handleLogout}>
                            Cerrar sesión
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default NavBar;
