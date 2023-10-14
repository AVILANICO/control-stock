import React, { useContext } from 'react'
import Modal from '../Modal/Modal';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { axiosInstance } from '../../services/axios.config';
import { ItemsContext, UPLOAD_ITEMS } from '../context/itemsContext';

const ItemTable = ({ item }) => {
  const { name, description, price, stock, id } = item
  const [modalShow, setModalShow] = useState(false);
  const { items, dispatch } = useContext(ItemsContext)

  // Nueva función para eliminar el producto
  const deleteProduct = (id) => {
    axiosInstance.delete(`/${id}`)
      .then((r) => {
        if (r.status === 200) {
          const itemsUpload = items.filter(item => item.id !== r.data.id);
          dispatch({ type: UPLOAD_ITEMS, payload: itemsUpload });
        }
        Swal.fire({
          position: 'center',
          background: '#2B2D2E',
          icon: 'success',
          width: '400',
          title: '¡Borrado con éxito!',
          text: 'El producto fue eliminado del sistema',
          color: '#3FAD2B',
          showConfirmButton: false,
          timer: 1500
        }
        );
      })
      .catch((error) => {
        console.error('Error al eliminar el producto: ', error);
        Swal.fire(
          'Error',
          'Un error ha ocurrido al eliminar el producto',
          'error'
        );
      });
  };

  const handleDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      background: '#2B2D2E',
      color: '#fff',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id); // Llama a la función de eliminación si se confirma
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          position: 'center',
          background: '#2B2D2E',
          width: '350',
          title: '¡Cancelado!',
          text: 'Tu producto esta a salvo :)',
          color: '#3FAD2B',
          showConfirmButton: false,
          timer: 1200
        }
        );
      }
    });
  };

  // const handleDelete = (id) => {
  //   axiosInstance.delete(`/${id}`)
  //     .then(r => {
  //       const swalWithBootstrapButtons = Swal.mixin({
  //         customClass: {
  //           confirmButton: 'btn btn-success',
  //           cancelButton: 'btn btn-danger'
  //         },
  //         buttonsStyling: false
  //       })

  //       swalWithBootstrapButtons.fire({
  //         title: 'Are you sure?',
  //         text: "You won't be able to revert this!",
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonText: 'Yes, delete it!',
  //         cancelButtonText: 'No, cancel!',
  //         reverseButtons: true
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           if (r.status === 200) {
  //             const itemsUpload = items.filter(item => item.id !== r.data.id)
  //             dispatch({ type: UPLOAD_ITEMS, payload: itemsUpload })
  //           }
  //           swalWithBootstrapButtons.fire(
  //             'Deleted!',
  //             'Your file has been deleted.',
  //             'success'
  //           )
  //         } else if (
  //           /* Read more about handling dismissals below */
  //           result.dismiss === Swal.DismissReason.cancel
  //         ) {
  //         }
  //       })

  //     })
  // }

  return (
    <>
      <tr>
        <td style={{ textAlign: 'center' }}>{id}</td>
        <td>{name}</td>
        <td style={{ textAlign: 'center' }}>{description}</td>
        <td style={{ textAlign: 'center' }}>{price}</td>
        <td style={{ textAlign: 'center' }}>{stock}</td>
        <td style={{
          display: 'flex',
          justifyContent: 'space-evenly'
        }}>
          <i style={{ cursor: 'pointer' }} className="bi bi-pencil-square" onClick={() => setModalShow(true)}></i>
          <i style={{ cursor: 'pointer' }} className="bi bi-trash3" onClick={() => handleDelete(id)}></i>
        </td>
      </tr>
      <Modal show={modalShow} onHide={() => setModalShow(false)} item={item} />
    </>
  )
}

export default ItemTable