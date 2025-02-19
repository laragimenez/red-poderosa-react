import './Movies.css';

import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import 'font-awesome/css/font-awesome.min.css';



const Movies = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1); //por defecto digo que esta sea la pagina numero 1
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);  // Datos de películas

  const fetchMovies= async () =>{
    try{
      setLoading (true)
      let response = await fetch('http://localhost:5058')  //Cambiar ejemplo `http://localhost:5088/Song?query=${query}&page=${page}&pageSize=3`
      let json = await response.json();

      setMovies(json.movies);
    
    } catch(e){
      console.error("Error fetching movies:", e);
    }  finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [page, query]);

 // Buscar películas 
  const find = (evt) => { 
    const {value} = evt.target;
    setQuery(value);
  }

  const prevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1))
  }

  const nextPage = () => {
    setPage(prevPage => Math.min(prevPage + 1, 10))
  }

  // Función para eliminar una película
  const deleteMovie = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:5058/movies/${movieId}`, {
        method: 'DELETE', // Método de solicitud DELETE
      });
      if (response.ok) {
        // Si la eliminación es exitosa, actualizamos el estado de las películas
        setMovies(movies.filter(movie => movie.id !== movieId));
      } else {
        console.error('Error deleting movie');
      }
    } catch (e) {
      console.error('Error deleting movie:', e);
    }
  }

  return (
    <>
      <div className="header">
        <h2>Lista de peliculas</h2>
        <div className="search-container ">
          {/* Campo de búsqueda */}
          <input type='text' value={query} onChange={find} placeholder="Buscar película..." className="form-control w-50"/> 
          <Link to="/movie" className="btn btn-primary"><i className="fa fa-plus"></i>Nuevo</Link>  {/* Link para crear nueva película */}
        </div>
      </div>
 
    {
      loading ?
        <div className='spinner-container'> 
          <Spinner animation="border" variant="primary" className="spinner"/> {/* es un indicador de carga mientras se procesan datos o se espera una respuesta de una API. */} 
        </div>:
        <Table striped bordered hover>
        <thead>
          <tr>
            <th className="col-id">#</th>
            <th className="col-title">Titulo</th>
            <th className="col-genre">Genero</th>
            <th className="col-description">Description</th>
            <th className="col-actions">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            movies.map((movie)=>{
              return (
                <tr>
                  <td>{movie.id}</td>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.description}</td>
                  <td>
                    <Link to="" className='btn btn-primary'><i class="fa fa-eye"></i></Link>
                    <Link to={`/movie/${movie.id}`} className='btn btn-primary'><i className="fa fa-pencil"></i></Link> {/*VERIFICAR La logica DE EDITAR Y ELIMINAR LAS RUTAS*/}
                    <Button variant="danger" onClick={() => deleteMovie(movie.id)}><i className="fa fa-times"></i></Button> {/* Botón de eliminar */}  
                  </td>
                </tr>
              );
            })
          }
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

export default Movies