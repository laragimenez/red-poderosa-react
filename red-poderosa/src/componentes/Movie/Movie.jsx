import './Movie.css';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { ImSpinner3 } from 'react-icons/im';
import Swal from 'sweetalert2';

const Movie = () => {
    const { title} = useParams();
    console.log(title);
    const [loading, setLoading] = useState(false);
    const [loadingForm, setLoadingForm] = useState(false);
    const [genres, setGenres] = useState([]);
    const [movie, setMovie] = useState({
        "TitleMovie": "",
        "DescriptionMovie": "",
        "GenreId": 0,
        "ImageUrl": "",
        "VideoUrl": "",
        "CommentIds": [0],
        "QualifyIds": [0],
        "HasOscar": true,
        "Id": 0
    });

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`http://localhost:5297/api/Genre`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
    
                const data = await response.json();
                setGenres(data); // Guardamos la lista de géneros en el estado
            } catch (error) {
                console.error("Error obteniendo los géneros:", error.message);
            }
        };
    
        fetchGenres();
    }, []);

    const fetchMovie = async () => {
        setLoadingForm(true);
        try {
            console.log("Datos enviados:", JSON.stringify(movie, null, 2));
            const response = await fetch(`http://localhost:5297/Movie/byName?Title=${title}`);
            
            console.log("Response: " + response);

            const json = await response.json();

            console.log("Json: " + json);

            setMovie({
                "TitleMovie": json.title,
                "DescriptionMovie": json.description,
                "GenreId": json.genre?.id || 0,
                "ImageUrl": json.imageUrl,
                "VideoUrl": json.videoUrl,
                "CommentIds": [0],
                "QualifyIds": [0],
                "HasOscar": json.hasOscar || false,
                "Id": json.id
            });
        } catch(e) {
            console.log("error");
        } finally {
            setLoadingForm(false);
        }
    }

    useEffect(() => {
        console.log(title)
        if(title && title !== '') {
            fetchMovie();
        }
    }, [title])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        try {
            let response;
            let url, method;
    
            if (!title) {
                // Si no hay título, se crea una nueva película
                url = 'http://localhost:5297/Movie';
                method = 'POST';
            } else {
                // Si hay título, se intenta actualizar la película
                url = 'http://localhost:5297/Movie/UpdateMovie';
                method = 'PUT';
            }
    
            response = await fetch(url, {
                method,
                body: JSON.stringify({
                    movieId: movie.Id,
                    titleMovie: movie.TitleMovie,
                    descriptionMovie: movie.DescriptionMovie,
                    genreId: movie.GenreId,
                    imageUrl: movie.ImageUrl,
                    videoUrl: movie.VideoUrl,
                    hasOscar: movie.HasOscar
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // Verificar si la respuesta es exitosa antes de parsear JSON
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
    
            const json = await response.json();
            // Limpiar el formulario después de un POST exitoso
            if (method === 'POST') {
                setMovie({
                    TitleMovie: "",
                    DescriptionMovie: "",
                    GenreId: 0,
                    ImageUrl: "",
                    VideoUrl: "",
                    CommentIds: [],
                    QualifyIds: [],
                    HasOscar: false,
                    Id: 0
                });
            }
    
            Swal.fire({
                title: json.success ? '¡Éxito!' : '¡Error!',
                text: json.message || 'Algo salió mal',
                icon: json.success ? 'success' : 'error',
                confirmButtonText: 'Aceptar'
            });
    
        } catch (error) {
            Swal.fire({
                title: '¡Error!',
                text: error.message || 'Algo salió muy, pero muy mal',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
    
        setMovie({
            ...movie,
            [name]: type === "checkbox" ? checked : name === "GenreId" ? Number(value) : value
        });
    };

    return (
        <>
            <div className="movie-container">
            {
                loadingForm ? <div className='spinner'><ImSpinner3/></div> :
                    <>
                        <h2>{title != undefined ? "Editar Pelicula" : "Nueva Pelicula"}</h2>
                        <form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="txtTitleMovie">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el título de la película"
                                onChange={handleInputChange}
                                value={movie.TitleMovie}
                                name="TitleMovie"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="txtDescriptionMovie">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la descripción de la película"
                                onChange={handleInputChange}
                                value={movie.DescriptionMovie}
                                name="DescriptionMovie"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="txtGenreId">
                            <Form.Label>Género</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={handleInputChange}
                                value={movie.GenreId}
                                name="GenreId"
                                
                            >
                                <option value={0}>Seleccione un género</option>
                                {genres.map((genre) => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="txtImageUrl">
                            <Form.Label>URL de la imagen</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la URL de la imagen"
                                onChange={handleInputChange}
                                value={movie.ImageUrl}
                                name="ImageUrl"
                            />
                        </Form.Group>
                        {movie.ImageUrl && <img src={movie.ImageUrl} alt="Imagen de la película" width="200" />}

                        <Form.Group className="mb-3" controlId="txtVideoUrl">
                            <Form.Label>URL del video</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la URL del video"
                                onChange={handleInputChange}
                                value={movie.VideoUrl}
                                name="VideoUrl"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="chkHasOscar">
                            <Form.Check
                                type="checkbox"
                                label="¿Tiene Oscar?"
                                onChange={handleInputChange}
                                checked={movie.HasOscar}
                                name="HasOscar"
                            />
                        </Form.Group>

                        <button type="submit"> {loading ? <ImSpinner3 className="spinner" /> : "Guardar"} </button>
                    </form>
                    </>
            }
            </div>
        </>
    );
}

export default Movie