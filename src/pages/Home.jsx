import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link as Anchor, Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="d-grid gap-2 mt-3">
      <h1 className='mt-3' style={{ textAlign: "center" }}>Bienvenido al Sistema de Stock</h1>
      <Button as={Link} to='/create' className='mt-3 container w-25' variant="primary" size="lg">
        Cargar Nuevo Producto
      </Button>
      <Button as={Link} to='/show' className='mt-3 container w-25' variant="secondary" size="lg">
        Ver Lista de Productos
      </Button>
    </div>
  )
}
