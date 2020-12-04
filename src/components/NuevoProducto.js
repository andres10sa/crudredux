import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {crearNuevoProductoAction} from '../actions/productoActions';


const NuevoProducto = () => {

  //state del componente
  const [name,setName]=useState('');
  const [price,setPrice]=useState(0);

  //utilizar use dispatch y devuelve una función
  const dispatch = useDispatch();

  const agregarProducto= producto => dispatch(crearNuevoProductoAction(producto));
  //hacer submit

  const submitNuevoProducto = e=>{
    e.preventDefault();

    if(name.trim()===''||price<=0){
      return;
    }

    //crear nuevo producto
    agregarProducto({
      name,price
    });
  }


    return ( 
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4 font-weight-bold">
                Nuevo Producto
              </h2>
              <form onSubmit={submitNuevoProducto}
              
              >
                <div className="form-group">
                  <label>Nuevo Producto</label>
                  <input 
                  type="text" 
                  className='form-control'
                  placeholder='Nombre Producto'
                  name='nombre'
                  value={name}
                  onChange={e=>setName(e.target.value)}
                
                  />
                </div>

                <div className="form-group">
                  <label>Precio Producto</label>
                  <input 
                  type="number" 
                  className='form-control'
                  placeholder='Precio Producto'
                  name='precio'
                  value={price}
                  onChange={e=>setPrice(e.target.value)}
                  />
                </div>
                <button className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>Agregar</button>

              </form>
            </div>
          </div>
        </div>

      </div>
     );
}
 
export default NuevoProducto;