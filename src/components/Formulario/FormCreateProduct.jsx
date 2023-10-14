import React from 'react';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Swal from 'sweetalert2'
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import './formulario.css'
import { axiosInstance } from '../../services/axios.config'

function FormCreateProduct() {

  const [initialFormValues, setInitialFormValues] = useState({
    name: '',
    description: '',
    stock: '',
    price: '',
  });

  // Restablecer los valores del formulario a los iniciales
  const resetForm = () => {
    setInitialFormValues({
      name: '',
      description: '',
      stock: '',
      price: '',
    });
  }

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
        onSubmit={(values, { isSubmitting, resetForm }) => {
          console.log(values)
          axiosInstance.post('/', values)
            .then(r => {
              if (r.status == 201) {
                console.log(r)
                isSubmitting(false)
              } else {
                throw new Error(`[${r.status}] Error en la solicitud`)
              }
            },
              resetForm(),
              Swal.fire({
                position: 'center',
                background: '#2B2D2E',
                icon: 'success',
                width: '350',
                title: '¡Cargado con éxito!',
                color: '#3FAD2B',
                showConfirmButton: false,
                timer: 1200
              })
            )
            .catch(err => console.log(err))
        }}>
        {
          ({ values, isSubmitting, errors, touched }) => (
            <Form>
              <FormBs.Group className='mb-3'>
                <label htmlFor='name'>Nombre del Producto</label>
                <Field className='form-control field-input' id='name' type='text' name='name' />
                {
                  errors.name && touched.name && (
                    <ErrorMessage name='name' component='div'></ErrorMessage>
                  )
                }
              </FormBs.Group>

              <FormBs.Group className='mb-3'>
                <label htmlFor='description'>Descripción</label>
                <Field className='form-control field-input' id='description' type='text' name='description' />
                {
                  errors.description && touched.description && (
                    <ErrorMessage name='description' component='div'></ErrorMessage>
                  )
                }
              </FormBs.Group>

              {/* <FormBs.Group className='mb-3'>
                <label htmlFor='image'>Imagen:</label>
                <Field className='form-control field-input' id='image' type='text' name='image' />
                {
                  errors.image && touched.image && (
                    <ErrorMessage name='image' component='div'></ErrorMessage>
                  )
                }
              </FormBs.Group> */}

              <FormBs.Group className='mb-3'>
                <label htmlFor='stock'>Stock</label>
                <Field className='form-control field-input' id='stock' type='number' name='stock' />
                {
                  errors.stock && touched.stock && (
                    <ErrorMessage name='stock' component='div'></ErrorMessage>
                  )
                }
              </FormBs.Group>

              <FormBs.Group className='mb-3'>
                <label htmlFor='price'>Precio</label>
                <Field className='form-control field-input' id='price' type='number' name='price' />
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