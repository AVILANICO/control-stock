import React, { useContext, useEffect, useState } from 'react'
import { axiosInstance } from '../services/axios.config';
import Table from '../components/Table/Table';
import { ItemsContext, UPLOAD_ITEMS } from '../components/context/itemsContext';
import './showProducts.css'

const ShowProducts = () => {
  // const [items, setItems] = useState([]);

  const { items, dispatch } = useContext(ItemsContext)

  useEffect(() => {
    axiosInstance.get('/')
      .then(r => {
        if (r.status === 200) {
          // setItems(r.data)
          dispatch({ type: UPLOAD_ITEMS, payload: r.data })
        } else {
          throw new Error(`[${r.status}]Error en la solicitud`)
        }
      })
      .catch(err => console.log(err))
  }, [])


  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Lista de Productos</h1>
      <div>
        {
          items.length > 0 ?
            <Table items={items} />
            : <h2 style={{ textAlign: 'center' }}>No hay productos en el sistema</h2>
        }
      </div>
    </div>
  )
}

export default ShowProducts