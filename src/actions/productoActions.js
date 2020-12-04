
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGAR_PRODUCTOS_EXITO,
    DESCARGAR_PRODUCTOS_ERROR

} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
import Axios from 'axios';

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

