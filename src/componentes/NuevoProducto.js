import React, {useState} from "react";

//REDUX
import {crearNuevoProductoAction} from '../actions/productosAction';
import {validarFormularioAction, validacionExito, validacionError} from '../actions/validacionAction';
import {useDispatch, useSelector} from 'react-redux';

const NuevoProducto = ({history}) => {

    //State local
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState('');

    //Crear nuevo producto
    const dispatch = useDispatch();
    const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));

    //Validar formulario
    const validarFormulario = () => dispatch(validarFormularioAction());
    const exitoValidacion = () => dispatch(validacionExito());
    const errorValidacion = () => dispatch(validacionError());

    //Obtener los datos del state
    const error = useSelector((state)=> state.error.error);

    //Agregar nuevo producto
    const submitNuevoProducto = e => {
        e.preventDefault();

        validarFormulario();

        //Validar el formulario
        if(nombre.trim()===''||precio.trim()===''){
            errorValidacion();
            return;
        }
        exitoValidacion();
        //Si pasa la validacion, crear producto
        agregarProducto({
          nombre, precio
        });

        //Redireccionar
        history.push('/');
    }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold ">
              Agregar Nuevo Libro
            </h2>
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Libro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Libro"
                  value={nombre}
                  onChange={ e => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Libro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Precio Libro"
                  value={precio}
                  onChange={ e => guardarPrecio(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>

              {error ? <div className="text-uppercase font-weight-bold alert alert-danger text-center mt-4">Todos los campos son obligatorios</div> : null}

          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
