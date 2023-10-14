import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import './formulario.css'
import { axiosInstance } from '../../services/axios.config'

function FormCreateProduct() {
  const initialValues = {
    name: '',
    description: '',
    // image: '',
    stock: '',
    price: '',
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El campo es obligatorio'),
    description: Yup.string().required('El campo es obligatorio'),
    // image: Yup.string(),
    stock: Yup.number().required('El campo es obligatorio'),
    price: Yup.number().required('El campo es obligatorio'),
  })

  return (
    <div className='container'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { isSubmitting }) => {
          console.log(values)
          axiosInstance.post('/', values)
            .then(r => {
              if (r.status == 201) {
                console.log(r)
                isSubmitting(false)
              } else {
                throw new Error(`[${r.status}] Error en la solicitud`)
              }
            })
            .catch(err => console.log(err))
        }}>
        {
          ({ values, isSubmitting, errors, touched }) => (
            <Form>
              <FormBs.Group className='mb-3'>
                <label htmlFor='name'>Nombre del Producto</label>
                <Field className='form-control field-input' id='name' type='text' placeholder='Ej: Gaseosa...' name='name' />
                {
                  errors.name && touched.name && (
                    <ErrorMessage name='name' component='div'></ErrorMessage>
                  )
                }
              </FormBs.Group>

              <FormBs.Group className='mb-3'>
                <label htmlFor='description'>Descripción</label>
                <Field className='form-control field-input' id='description' type='text' placeholder='Ej:Sprite...' name='description' />
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
                <label htmlFor='stock'>Stock</label>
                <Field className='form-control field-input' id='stock' type='number' placeholder='Ej: 5' name='stock' />
                {
                  errors.stock && touched.stock && (
                    <ErrorMessage name='stock' component='div'></ErrorMessage>
                  )
                }
              </FormBs.Group>

              <FormBs.Group className='mb-3'>
                <label htmlFor='price'>Precio</label>
                <Field className='form-control field-input' id='price' type='number' placeholder='Ej: 999' name='price' />
                {
                  errors.price && touched.price && (
                    <ErrorMessage name='price' component='div'></ErrorMessage>
                  )
                }
              </FormBs.Group>

              <Button className='btn btn-primary' type='submit'>Cargar Producto</Button>
              {
                isSubmitting ? (<p></p>) : null
              }
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

export default FormCreateProduct