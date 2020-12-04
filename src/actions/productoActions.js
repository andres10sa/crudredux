
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//Crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async (dispatch)=>{
        dispatch(agregarProducto());

        try {
            //insertar en la api
         await clienteAxios.post('/productosss',producto)
            //si todo sale bien, actualiza el state
            dispatch(agregarProductoExito(producto));
            Swal.fire('Correcto','El producto se agregó correctamente','success')
        } catch (error) {
            console.log(error);
            //si hay un error cambiar state
            dispatch(agregarProductoError(true));
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