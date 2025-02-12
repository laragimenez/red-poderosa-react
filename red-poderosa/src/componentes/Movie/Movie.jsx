import React from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import Table from 'react-bootstrap/esm/Table';
import { useParams } from 'react-router-dom'

const Movie = () => {
    const{movieName} = useParams(); //useaPrams tambien es un Hoock
    return (
        <>
            <div>
            'welcome-to-the-jangle' {movieName}
            </div>
        
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
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </Table>
        </>
    )
}

export default Movie
