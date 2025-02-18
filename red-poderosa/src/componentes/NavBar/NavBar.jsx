import 'bootstrap/dist/css/bootstrap.min.css'; //importamos la hoja de stylo de bootstrap
import './NavBar.css'; //esta abajo de la libreria bootstrap por que tomamos la prioridad del estilo de bootstrap pero se puede cambiar el estilo, es en forma cascada.

import React from 'react';
import Container  from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavBar = () => {
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
                        <Nav.Link href="/movies">Movies</Nav.Link>
                        <Nav.Link href="/genres">Genres</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default NavBar;
