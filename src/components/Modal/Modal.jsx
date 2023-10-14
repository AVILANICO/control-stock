import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import ModalBs from 'react-bootstrap/Modal';
import FormBs from 'react-bootstrap/Form';
import { ItemsContext, UPLOAD_ITEMS } from '../context/itemsContext';
import { axiosInstance } from '../../services/axios.config';

const Modal = (props) => {

  const { items, dispatch } = useContext(ItemsContext)

  const initialCredentials = {
    name: props.item.name || '',
    description: props.item.description || '',
    // image: '',
    stock: props.item.stock || '',
    price: props.item.price || '',
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El campo es obligatorio'),
    description: Yup.string().required('El campo es obligatorio'),
    // image: Yup.string(),
    stock: Yup.number().required('El campo es obligatorio'),
    price: Yup.number().required('El campo es obligatorio'),
  })


  return (
    <ModalBs
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalBs.Header closeButton className='bg-dark'>
        <ModalBs.Title id="contained-modal-title-vcenter">
          ModalBs heading
        </ModalBs.Title>
      </ModalBs.Header>
      <ModalBs.Body className='bg-dark'>
        <Formik
          initialValues={initialCredentials}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            // await props.onSubmit(props.item.id, values)
            axiosInstance.put(`/${props.item.id}`, values)
              .then(r => {
                if (r.status === 200) {
                  const itemsUpload = items.map(item => {
                    if (item.id === r.data.id) {
                      return r.data
                    }
                    return item
                  })
                  dispatch({ type: UPLOAD_ITEMS, payload: itemsUpload })
                  setSubmitting(false)
                } else {
                  throw new Error(`Error [${r.status}] en la solicitud`)
                }
              })
              .catch(err => console.log(err))
            props.onHide()
          }}>
          {
            ({ values, isSubmitting, errors, touched, handleChange }) => (
              <Form>
                <FormBs.Group className='mb-3'>
                  <label htmlFor='name'>Nombre del Producto:</label>
                  <Field className='form-control field-input' id='name' type='text' placeholder='Ej: Gaseosa...' name='name' onChange={handleChange} />
                  {
                    errors.name && touched.name && (
                      <ErrorMessage name='name' component='div'></ErrorMessage>
                    )
                  }
                </FormBs.Group>

                <FormBs.Group className='mb-3'>
                  <label htmlFor='description'>Descripción:</label>
                  <Field className='form-control field-input' id='description' type='text' placeholder='Ej:Sprite...' name='description' onChange={handleChange} />
                  {
                    errors.description && touched.description && (
                      <ErrorMessage name='description' component='div'></ErrorMessage>
                    )
                  }
                </FormBs.Group>

                {/* <FormBs.Group className='mb-3'>
                <label htmlFor='image'>Imagen:</label>
                <Field className='form-control field-input' id='image' type='text' placeholder='Link de imagen' name='image' />
                {
                  errors.image && touched.image && (
                    <ErrorMessage name='image' component='div'></ErrorMessage>
                  )
                }
              </FormBs.Group> */}

                <FormBs.Group className='mb-3'>
                  <label htmlFor='stock'>Stock:</label>
                  <Field className='form-control field-input' id='stock' type='number' placeholder='Ej: 5' name='stock' onChange={handleChange} />
                  {
                    errors.stock && touched.stock && (
                      <ErrorMessage name='stock' component='div'></ErrorMessage>
                    )
                  }
                </FormBs.Group>

                <FormBs.Group className='mb-3'>
                  <label htmlFor='price'>Precio:</label>
                  <Field className='form-control field-input' id='price' type='number' placeholder='Ej: 999' name='price' onChange={handleChange} />
                  {
                    errors.price && touched.price && (
                      <ErrorMessage name='price' component='div'></ErrorMessage>
                    )
                  }
                </FormBs.Group>

                <Button className='btn btn-primary' type='submit'>Editar Producto</Button>
                {
                  isSubmitting ? (<p></p>) : null
                }
              </Form>
            )
          }
        </Formik>
      </ModalBs.Body>
      <ModalBs.Footer className='bg-dark'>
        <Button onClick={props.onHide}>Cerrar</Button>
      </ModalBs.Footer>
    </ModalBs>
  )
}

export default Modal