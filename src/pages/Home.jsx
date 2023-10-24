import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './home.css'

export default function Home() {
  return (
    <div className="d-flex flex-column justify-content-center gap-5 container-home">
      <h1 className='mt-3' style={{ textAlign: "center", fontSize: '48px' }}>Bienvenido al Sistema de Stock</h1>
      <Button as={Link} to='/create' className='mt-3 container botones' variant="primary" size="lg">
        Cargar Nuevo Producto
      </Button>
      <Button as={Link} to='/show' className='mt-3 container botones' variant="secondary" size="lg">
        Ver Lista de Productos
      </Button>
    </div>
  )
}
