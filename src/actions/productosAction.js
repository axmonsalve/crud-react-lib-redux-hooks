import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,  
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITOSA,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR
} from "../types";
import clienteAxios from "../config/axios";

//Crear un nuevo producto, funcion principal

export function crearNuevoProductoAction(producto) {
  return dispatch => {
    dispatch(nuevoProducto());

    //Insertar en la API
    clienteAxios
      .post("/libros", producto)
      .then(respuesta => {
        console.log(respuesta);
        //Si se inserta correctamente...
        dispatch(agregarProductoExito(producto));
      })
      .catch(error => {
        //si ocurre un error
        dispatch(agregarProductoError(error));
      });
  };
}

export const nuevoProducto = () => ({
  type: AGREGAR_PRODUCTO
});

export const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

export const agregarProductoError = error => ({
  type: AGREGAR_PRODUCTO_ERROR
});

//Obtener listado de productos (Consultar API)
export function obtenerProductosAction(){
  return (dispatch) => {
    dispatch(obtenerProductosComienzo());

    //Consultar la API
    clienteAxios.get('/libros')
    .then(respuesta=>{
      //console.log(respuesta)
      dispatch(descargaProductosExitosa(respuesta.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(descargaProductosError());
    })
  }
}

export const obtenerProductosComienzo = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS
})

export const descargaProductosExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITOSA,
  payload: productos 
})

export const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR
})

//Funcion que elimina un producto
export function borrarProductoAction(id){ //id para eliminar de la API
  return (dispatch) => {
    dispatch(obtenerProductoEliminar())
    //Eliminado desde la API
    clienteAxios.delete(`/librosss/${id}`)
      .then(respuesta =>{
        dispatch(eliminarProductoExito(id)) //id para eliminarlo del state
        console.log(respuesta)
      })
      .catch(error =>{
        console.log(error);
        dispatch(eliminarProductoError());
      })
  }
}

export const obtenerProductoEliminar = () =>({
  type: OBTENER_PRODUCTO_ELIMINAR
})

export const eliminarProductoExito = id =>({
  type: PRODUCTO_ELIMINADO_EXITO,
  payload: id
})

export const eliminarProductoError = () =>({
  type: PRODUCTO_ELIMINADO_ERROR
})