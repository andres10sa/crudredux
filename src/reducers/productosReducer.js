//cara reducer tiene su propio state

import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGAR_PRODUCTOS_EXITO,
    DESCARGAR_PRODUCTOS_ERROR
} from '../types';

const initialState={
    productos:[],
    error:null,
    loading:false,
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
        
        
        default : return state;
    }

}