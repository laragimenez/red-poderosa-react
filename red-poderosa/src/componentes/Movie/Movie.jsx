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
    const [movie, setMovie] = useState({
        "titleMovie": "string",
        "descriptionMovie": "string",
        "genreId": 0,
        "imageUrl": "string",
        "videoUrl": "string",
        "commentIds": [0],
        "qualifyIds": [0],
        "hasOscar": true,
        "id": 0
    });

    const fecthMovie = async () => {
        setLoadingForm(true);
        try {
            let response = await fetch(`http://localhost:5297/Movie/byName?Title=${title}`);
            
            console.log("Response: " + response);

            let json = await response.json();

            console.log("Json: " + json);

            setMovie({
                "titleMovie": json.title,
                "descriptionMovie": json.description,
                "genreId": 1,
                "imageUrl": json.imageUrl,
                "videoUrl": json.videoUrl,
                "commentIds": [0],
                "qualifyIds": [0],
                "hasOscar": true,
                "id": json.id
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
            fecthMovie();
        }
    }, [title])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            let response;
            if( title == undefined) {
                response = await fetch('http://localhost:5297/Movie', {
                    method: 'POST',
                    body: JSON.stringify(movie),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            } else {
                response = await fetch('http://localhost:5297/Movie', {
                    method: 'PUT',
                    body: JSON.stringify(movie),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            }

            const json = await response.json();

            setMovie({
                "titleMovie": "",
                "descriptionMovie": "",
                "genreId": 0,
                "imageUrl": "",
                "videoUrl": "",
                "commentIds": [0],
                "qualifyIds": [0],
                "hasOscar": true,
                "id": 0
            });

            // Usamos SweetAlert2 en lugar de alert()
            Swal.fire({
                title: '¡Éxito!',
                text: json.message,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

        } catch(e) {
            // Mostramos la alerta de error con SweetAlert2
            Swal.fire({
                title: '¡Error!',
                text: 'Algo salió muy, pero muy mal',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        } finally {
            setLoading(false);
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMovie({...movie, [name]: value});
        console.log(movie);
    }

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
                                value={movie.titleMovie}
                                name="titleMovie"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="txtDescriptionMovie">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la descripción de la película"
                                onChange={handleInputChange}
                                value={movie.descriptionMovie}
                                name="descriptionMovie"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="txtGenreId">
                            <Form.Label>Género</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={handleInputChange}
                                value={movie.genreId}
                                name="genreId"
                            >
                                <option value={0}>Seleccione un género</option>
                                <option value={1}>Acción</option>
                                <option value={2}>Comedia</option>
                                <option value={3}>Drama</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="txtImageUrl">
                            <Form.Label>URL de la imagen</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la URL de la imagen"
                                onChange={handleInputChange}
                                value={movie.imageUrl}
                                name="imageUrl"
                            />
                        </Form.Group>
                        {movie.imageUrl && <img src={movie.imageUrl} alt="Imagen de la película" width="200" />}

                        <Form.Group className="mb-3" controlId="txtVideoUrl">
                            <Form.Label>URL del video</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la URL del video"
                                onChange={handleInputChange}
                                value={movie.videoUrl}
                                name="videoUrl"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="chkHasOscar">
                            <Form.Check
                                type="checkbox"
                                label="¿Tiene Oscar?"
                                onChange={handleInputChange}
                                checked={movie.hasOscar}
                                name="hasOscar"
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