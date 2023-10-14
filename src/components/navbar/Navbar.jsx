import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBs from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
import './navbar.css'

function Navbar() {
  return (
    <NavbarBs bg="dark" data-bs-theme="dark">
      <Container fluid>
        <NavbarBs.Brand href="/">Tienda</NavbarBs.Brand>
        <Nav className="nav-conteiner justify-content-evenly">
          <Nav.Item>
            <Link to='/' className='link'>Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to='/create' className='link'>Cargar Producto</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to='/show' className='link'>Lista de Productos</Link>
          </Nav.Item>
        </Nav>
      </Container>
    </NavbarBs>
  )
}

export default Navbar
