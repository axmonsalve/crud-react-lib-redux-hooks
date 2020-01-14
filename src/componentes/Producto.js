import React from "react";
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
//Redux
import {useDispatch} from 'react-redux';
import {borrarProductoAction} from '../actions/productosAction';

const Producto = ({ producto }) => {

  //Dispatch para ejecutar las acciones
  const dispatch = useDispatch();

  const confirmarEliminarProducto = id => {

    //Confirmación de sweetAlert
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Un producto eliminado no se puede recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimnar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          'El producto se eliminó correctamente',
          'success'
        )
        console.log(id);
        dispatch(borrarProductoAction(id));
      /* }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!'
        }) */
      }
    })
   
    
  }

  const {id, nombre, precio } = producto;
  return (
    <tr>
        <td>{nombre}</td>
        <td><span className="font-weight-bold">${precio}</span></td>
        <td className="acciones">
            <Link 
                to={`/productos/editar/${id}`}
                className="btn btn-primary mr-2"
            >Editar</Link>
            <button 
                className="btn btn-danger"
                onClick={()=> confirmarEliminarProducto(id)}
            >Eliminar

            </button>
            
        </td>
    </tr>
  );
};

export default Producto;
