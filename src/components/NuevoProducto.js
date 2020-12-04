import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {crearNuevoProductoAction} from '../actions/productoActions';


const NuevoProducto = ({history}) => {

  //state del componente
  const [name,setName]=useState('');
  const [price,setPrice]=useState(0);

  //utilizar use dispatch y devuelve una función
  const dispatch = useDispatch();

  //acceder al state del store

  const {loading,error} = useSelector(state=>state.productos)
  console.log(loading,'todo')
  // const {loading,error} =

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
    //redireccionar
    history.push('/')
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
              {loading ? <p>Cargando...</p>:null}
               {error ? <p className='alert alert-danger p-2 mt-4 text-center'>Hubo un error</p>:null}
            </div>
          </div>
        </div>

      </div>
     );
}
 
export default NuevoProducto;