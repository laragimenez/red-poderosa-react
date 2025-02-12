import React, { useState } from 'react'
import MyButton from '../MyButton/MyButton'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import debounce from 'lodash';
import 'font-awesome/css/font-awesome.min.css';
import './MyMovies.css';


const MyMovies = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1); //por defecto digo que esta sea la pagina numero 1
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);  // Datos de películas

 // Buscar películas (con debounce)
  const find = debounce((evt) => {  //con debounce evita hacer demasiadas solicitudes o cálculos mientras el usuario escribe.
    const {value} = evt.target;
    setQuery(value);
  },500)

  const prevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1))
  }

  const nextPage = () => {
    setPage(prevPage => Math.min(prevPage + 1, 10))
  }

  return (
    <>
      <div className="header">
        <h2>Lista de peliculas</h2>
        <div className="search-container ">
          {/* Campo de búsqueda */}
          <input type='text'     
            value={query} 
            onChange={find} 
            placeholder="Buscar película..." 
            className="form-control w-50"/> 
          <Link to="/movies" className="btn btn-primary"><i className="fa fa-plus"></i>Nuevo</Link>  {/* Link para crear nueva película */}
        </div>
      </div>
 
    {
      loading ?
        <div className='spinner'> 
          <Spinner animation="border" variant="primary"/> {/* es un indicador de carga mientras se procesan datos o se espera una respuesta de una API. */} 
        </div>:
        <Table striped bordered hover>
        <thead>
          <tr>
            <th className="col-id">#</th>
            <th className="col-title">Titulo</th>
            <th className="col-genre">img</th>
            <th className="col-description">Description</th>
            <th className="col-actions">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <Link to="" className='btn btn-primary'><i class="fa fa-eye"></i></Link>
              <Link tO={`/edit/${movies.id}`} className='btn btn-primary'><i className="fa fa-pencil"></i></Link> {/*VERIFICAR La logica DE EDITAR Y ELIMINAR LAS RUTAS*/}
              <Link to="" className='btn btn-primary'><i className="fa fa-times"></i></Link>  
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>
              <Link to="" className='btn btn-primary'><i class="fa fa-eye"></i></Link>
              <Link to="" className='btn btn-primary'><i className="fa fa-pencil"></i></Link> 
              <Link to="" className='btn btn-primary'><i className="fa fa-times"></i></Link> 
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    }
    <div className="pagination-container">
      {/* Botones de Paginación */}
      <Button className="btn btn-secondary me-2" onClick={prevPage} disabled={page === 1}>&lt;</Button><span>{page}</span>
      <Button className="btn btn-secondary ms-2" onClick={nextPage}>&gt;</Button>
    </div>

    {/*<a className= "btn btn-secondary" onClick={prevPage}>Anterior</a>
    <p>{page}</p>
    <a className= "btn btn-secondary" onClick={nextPage}>Siguiente</a>/*/}
      
    </>
  )
}

export default MyMovies

/*
const navigate = useNavigate();

  const callback = () => {
    navigate('/Error')
    <div>
      BIENVENIDO A PELICULAS
      <Button onClick={callback}>Click me</Button>
    </div>
*/