import './Movies.css';

import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import 'font-awesome/css/font-awesome.min.css';
import Swal from 'sweetalert2';

const Movies = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1); //por defecto digo que esta sea la pagina numero 1
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);  // Datos de películas
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchMovies= async () =>{
    try{
      setLoading (true)
      const paramsQuery = query.trim() ? query : "all";
      let response = await fetch(`http://localhost:5297/Movie/MovieGener?query=${paramsQuery}&page=${page}&pageSize=10`)  
      let json = await response.json();

      setMovies(json.movies);
      setTotalRecords(json.totalRecords);
    
    } catch(e){
      console.error("Error fetching movies:", e);
    }  finally{
      setLoading(false)
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
    const totalPages = Math.ceil(totalRecords / 10); // Calcula cuántas páginas hay en total
    if (page < totalPages) { 
      setPage(prevPage => prevPage + 1);
    }else {
      Swal.fire({
        icon: "info",
        title: "No hay más películas",
        text: "Has llegado al final de la lista.",
        confirmButtonText: "Aceptar"
      });
    }
  };

  // Función para eliminar una película
  const deleteMovie = async (movieId, movieName) => {
    Swal.fire({
      title: `¿Deseas borrar esta película?`,
      text: `Película: ${movieName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            console.log(`Deleting movie with ID: ${movieId}`);
      
            const response = await fetch(`http://localhost:5297/Movie/DeleteMovie`, { 
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: movieId }) //Ahora enviamos el ID en el body
            });
            if (response.ok) {
                // Si la eliminación es exitosa, actualizamos el estado de las películas
                setMovies(movies.filter(movie => movie.id !== movieId));
                Swal.fire("Eliminado", `La película ${movieName} ha sido eliminada.`, "success");
            } else {
                Swal.fire("Error", "No se pudo eliminar la película.", "error");
            }
        } catch (e) {
            console.error('Error deleting movie:', e);
            Swal.fire("Error", "Ocurrió un problema al eliminar.", "error");
        }
      }
    });
  };

  const viewMovieDetails = async (title) => {
    try {
      const response = await fetch(`http://localhost:5297/Movie/byName?Title=${title}`);
      if (!response.ok) {
        throw new Error("Error al obtener los detalles de la película");
      }
      const movie = await response.json(); // Obtenemos los datos completos
  
      // Mostramos la alerta con la información completa
      Swal.fire({
        title: movie.title || "Título no disponible",
        html: `
            <div style="text-align:left;">
              <p><strong>🎭 Género:</strong> ${movie.genre}</p>
              <p><strong>📖 Descripción:</strong> ${movie.description}</p>
              <p><strong>🏆 Tiene Oscar:</strong> ${movie.hasOscar ? "Sí 🏅" : "No ❌"}</p>
              <img src="${movie.imageUrl || ''}" alt="${movie.title}" style="width: 40%; max-width: 300px; height: auto; display: block; margin: 0 auto; border-radius: 10px;">
              <p><a href="${movie.videoUrl}" target="_blank" style="color:#ff0000; font-weight:bold;">🎬 Ver tráiler</a></p>
            </div>
        `,
        confirmButtonText: "Cerrar",
      });
    } catch (error) {
      console.error("Error al obtener la película:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo cargar la información de la película.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };
  
  return (
    <>
      <div className="header">
        <h1>Lista de peliculas</h1>
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
          <Table striped bordered hover className="tableMovies">
            <thead>
              <tr>
                <th className="col-id">#</th>
                <th className="col-genre">Titulo</th>
                <th className="col-title">Imagen</th>
                <th className="col-actions">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                movies.map((movie)=>{
                  return (
                    <tr>
                      <td>{movie.id}</td>
                      <td>{movie.name}</td>
                      <td>{movie.imageUrl}</td>
                      <td>
                        <Button variant="Info" onClick={() => viewMovieDetails(movie.name)}><i className="fa fa-eye"></i></Button>
                        <Link to={`/movie/${movie.name}`} className='btn btn-primary'><i className="fa fa-pencil"></i></Link> {/*VERIFICAR La logica DE EDITAR Y ELIMINAR LAS RUTAS*/}
                        <Button variant="danger" onClick={() => deleteMovie(movie.id, movie.name)}><i className="fa fa-times"></i></Button> {/* Botón de eliminar */}  
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
        <Button className="btn btn-secondary ms-2" onClick={nextPage} disabled={movies.length === 0}>&gt;</Button>
      </div>
      
    </>
  )
}

export default Movies