
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGAR_PRODUCTOS_EXITO,
    DESCARGAR_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR

} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';


//Crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async (dispatch)=>{
        dispatch(agregarProducto());

        try {
            //insertar en la api
         await clienteAxios.post('/productos',producto)
            //si todo sale bien, actualiza el state
            dispatch(agregarProductoExito(producto));
            Swal.fire('Correcto','El producto se agregó correctamente','success')
        } catch (error) {
            console.log(error);
            //si hay un error cambiar state
            dispatch(agregarProductoError());
            Swal.fire({icon:'error',title:'Hubo un error',texto:'Hubo un error'})
        }
    }
};

const agregarProducto = ()=>({
    type:AGREGAR_PRODUCTO,
    payload:true
});

//Si el producto se guarda en la base de datos
const agregarProductoExito = producto=>({
    type:AGREGAR_PRODUCTO_EXITO,
    payload:producto
})

//si hubo un error
const agregarProductoError = estado=>({
   type:AGREGAR_PRODUCTO_ERROR,
   payload:estado
})

//Función que descarga los productos de la base de datos

export function obtenerProductos(){
    return async (dispatch)=>{
           dispatch(descargarProductos());

           try {
           
                   const productos =  await clienteAxios.get('/productos');
                   dispatch(descargarProductosExitosa(productos.data));
          
           } catch (error) {
               console.log(error)
               dispatch(descargarProductosError(error))
           }
    }
}


//descargar productos
const descargarProductos = ()=>({
    type:COMENZAR_DESCARGA_PRODUCTOS,
    payload:true
});

//descargaproductoexitosa
const descargarProductosExitosa=(productos)=>({
    type:DESCARGAR_PRODUCTOS_EXITO,
    payload:productos
})

//descargadefectuosa
const descargarProductosError=()=>({
    type:DESCARGAR_PRODUCTOS_ERROR,
    payload:true
})


// SELECCIONA Y ELIMINA EL PRODUCTO
export function borrarProductoAction(id){
   return async(dispatch)=>{
       dispatch(obtenerProductoEliminar(id));
       try {
           //eliminar de la api
           await clienteAxios.delete(`/productos/${id}`);
           Swal.fire(
            'Eliminado','El producto ha sido eliminado.','succes'
        )
           //eliminar del state
           dispatch(eliminarProductoExito());
       } catch (error) {
           console.log(error);
           dispatch(eliminarProductoError());
       }
   }
}

const obtenerProductoEliminar = id=>({
    type:OBTENER_PRODUCTO_ELIMINAR,
    payload:id
});
const eliminarProductoExito = ()=>({
    type:PRODUCTO_ELIMINADO_EXITO
});
const eliminarProductoError = ()=>({
    type:PRODUCTO_ELIMINADO_ERROR,
    payload:true
});

export function obtenerProductoEditar(producto) {
    return async(dispatch)=>{
      dispatch(obtenerProductoEditarAction(producto));
    }
}
const obtenerProductoEditarAction = (producto)=>({
    type:OBTENER_PRODUCTO_EDITAR,
    payload:producto
})
//editar un rgistro en la api
export function editarProductoAction(producto){
    return async(dispatch)=>{
          dispatch(editarProducto());
          try {
        await clienteAxios.put(`productos/${producto.id}`,producto);
           dispatch(editarProductoExito(producto))
          
          } catch (error) {
              console.log(error)
              dispatch(editarProductoError());
          }
    }
}
const editarProducto = ()=>({
    type:COMENZAR_EDICION_PRODUCTO,
});
const editarProductoExito = (producto)=>({
    type:PRODUCTO_EDITADO_EXITO,
    payload:producto
})
const editarProductoError = ()=>({
    type:PRODUCTO_EDITADO_ERROR,
    payload:true
})
