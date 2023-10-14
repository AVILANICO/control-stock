import React from 'react'
import TableBs from 'react-bootstrap/Table';
import ItemTable from '../ItemTable/ItemTable';

const Table = ({ items }) => {

  return (
    <TableBs striped bordered hover variant="dark">
      <thead>
        <tr>
          <th style={{ textAlign: 'center' }}>#ID</th>
          <th>Producto</th>
          <th style={{ textAlign: 'center' }}>Precio</th>
          <th style={{ textAlign: 'center' }}>Stock</th>
          <th style={{ textAlign: 'center' }}>Modificar</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <ItemTable item={item} key={i} />
        ))}
      </tbody>
    </TableBs>
  );
}

export default Table