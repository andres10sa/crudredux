import React from 'react';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';
import {shallowEqual, useDispatch} from 'react-redux';
import {borrarProductoAction,obtenerProductoEditar} from '../actions/productoActions';

const Producto = ({producto}) => {
    const {name,price,id,nombre,precio}=producto;

    const dispatch= useDispatch();
    const history=useHistory();//habilita history
 
    //Confirma si desea eliminarlo
    const confirmarEliminarProducto =id=>{
        //preugntar al usuario
         Swal.fire({
          title:'¿Estás seguro?',
          text:'El producto eliminado no se pude recuperar',
          icon:'warning',
          showCancelButton:true,
          confirmButtonColor:'#3085d6',
          cancelButtonColor:'#d33',
          confirmButtonText:'Si, eliminar'
         }).then((res)=>{
             if(res.value){
                 //pasarlo al action
                dispatch(borrarProductoAction(id))
             }
         })
    }
    //funcion que redirige
    const redreccionarEdicion=producto=>{
        dispatch(obtenerProductoEditar(producto))
        history.push(`/productos/editar/${producto.id}`)
    }
    
    return ( 
           <tr>
               <td>{name ? name : nombre}</td>
               <td><span className='font-weight-bold'>$ {price ? price : precio}</span></td>
               <td className='acciones'>
                   <button className='btn btn-primary mr-2' onClick={()=>redreccionarEdicion(producto)}>Editar</button>
                   <button className="btn btn-danger" onClick={()=>confirmarEliminarProducto(id)}>Eliminar</button>
               </td>
           </tr>
     );
}
 
export default Producto;