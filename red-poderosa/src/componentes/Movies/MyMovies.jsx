import React, { useState } from 'react'
import MyButton from '../MyButton/MyButton'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';


const MyMovies = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1); //por defecto digo que esta sea la pagina numero 1
  const [loading, setLoading] = useState(false);

  const find = (evt) => {
    const {value} = evt.target;
    setQuery(value);
  }

  const prevPage = () => {
    setPage(page - 1)
  }

  const nextPage = () => {
    setPage(page + 1)
  }

  return (
    <>
    <Link to="/movies" className="btn btn-primary">Nuevo</Link>
    <input type='text' value={query} onChange={find}/>
    {
      loading ?
        <div className='spinner'><Spinner/></div>:
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Titulo</th>
            <th>Genero</th>
            <th>Description</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <Link to="" className='btn btn-primary'>Editar</Link> 
              <Link to="" className='btn btn-primary'>Eliminar</Link> 
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>
              <Link to="" className='btn btn-primary'>Editar</Link> 
              <Link to="" className='btn btn-primary'>Eliminar</Link> 
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
    <a className= "btn btn-secondary" onClick={prevPage}>Anterior</a>
    <p>{page}</p>
    <a className= "btn btn-secondary" onClick={nextPage}>Siguiente</a>
      
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