import React from "react";
import {nanoid} from 'nanoid'

function App() {

  const [tarea, setTarea] = React.useState('')
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState ('')
  const [error, setError] = React.useState(null)


  
  const agregarTarea = e =>{
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Elemento Vacio')
      setError('Escriba algo por favor....')
      return
    }
    setTareas([
      ...tareas,
      {id: nanoid(10), nombreTarea:tarea}
    ])
    setTarea('')
    setError(null)
  }

  const eliminarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const editarTarea = item => {
    setModoEdicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
  }

  const editar = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Elemento Vacio')
      setError('Escriba algo por favor....')
      return
    }
    const arrayEditado = tareas.map(item => item.id === id ? {id, nombreTarea:tarea} : item)

    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }


  return (
    <div className="container mt-5">
      <h1 className="text-center">PRIMER CRUD DE PRACTICA</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">LISTA DE TAREAS</h4>
          <ul className="list-group">
            {

              tareas.length === 0 ? (
                <li className="list-group-item">NO HAY TAREAS</li>
              ):(
                tareas.map(item => (
                <li className="list-group-item d-flex justify-content-between" key={item.id}>
                  <span className="lead ">{item.nombreTarea}</span>
                  <div>
                    <button 
                      className="btn btn-sm btn-danger float-right mx-2"
                      onClick={()=>eliminarTarea(item.id)}>
                      Eliminar
                    </button>
  
                    <button 
                      className="btn btn-sm btn-warning float-right"
                      onClick={()=>editarTarea(item)}>
                      Editar
                    </button>
                  </div>
               </li>
                ))
              )
            }

          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={modoEdicion ? editar : agregarTarea}>

            {
              error ? <span className="text-danger">{error}</span> : null
            }

            <input 
              type="text" 
              className="form-control mb-2" 
              placeholder="Ingrese Tarea"
              onChange={ e => setTarea(e.target.value)}
              value={tarea}
            />

            {
              modoEdicion ? (
                <button className="btn btn-warning btn-block" type="submit">Editar</button>
              ):
                <button className="btn btn-dark btn-block" type="submit">Agregar</button>
            }
              
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
