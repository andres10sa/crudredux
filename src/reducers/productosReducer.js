//cara reducer tiene su propio state

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
    PRODUCTO_EDITADO_EXITO,

} from '../types';

const initialState={
    productos:[],
    error:null,
    loading:false,
    productoeliminar:null,
    productoeditar:null
}

export default function(state=initialState,action){

    switch(action.type){
        case COMENZAR_DESCARGA_PRODUCTOS:
        case AGREGAR_PRODUCTO: return {
            ...state,
            loading:action.payload,
        }
        case AGREGAR_PRODUCTO_EXITO:return{
            ...state,
            loading:false,
            productos:[...state.productos,action.payload]
        }
        case AGREGAR_PRODUCTO_ERROR:
        case DESCARGAR_PRODUCTOS_ERROR:
        return{
            ...state,
            loading:false,
            error:action.payload
        }
        case DESCARGAR_PRODUCTOS_EXITO:return{
            ...state,
            loading:false,
            error:null,
            productos:action.payload
        }
        case OBTENER_PRODUCTO_ELIMINAR:return{
            ...state,
            productoeliminar:action.payload
        }
        case PRODUCTO_ELIMINADO_EXITO:return{
            ...state,
            productos:state.productos.filter(pro=>pro.id!==state.productoeliminar),
            productoeliminar:null
        }
        case PRODUCTO_ELIMINADO_ERROR:return{
            ...state,
            error:action.payload
        }
        case OBTENER_PRODUCTO_EDITAR:return{
            ...state,
            productoeditar:action.payload
        }
        case PRODUCTO_EDITADO_EXITO:return{
            ...state,
            productoeditar:null,
            //reemplazar un producto actual
            productos:state.productos.map(producto=>
            producto.id=== action.payload.id ? producto=action.payload : producto
        // producto = producto.id===action.payload.id ? action.payload : producto
            )
        }
        default : return state;
    }

}