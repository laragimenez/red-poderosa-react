import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Users.css';

const Users = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    // Función para obtener los usuarios
    const fetchUsers = async () => {
      try {
            setLoading(true);
            let response = await fetch(`http://localhost:5156/User?query=${query}&page=${page}`);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            let json = await response.json();
            setUsers(json);  // Asegúrate de que el backend devuelve una lista
        } catch (e) {
            console.error("Error:", e);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchUsers();
    }, [page, query]);

    const find = (evt) => {
        const { value } = evt.target;
        setQuery(value);
    };
    
    // Función para banear a un usuario
    const banUser = async (id) => {
      try {
          const response = await fetch(`http://localhost:5156/User/${id}/ban`, { method: 'PATCH' });
          if (response.ok) {
              alert('Usuario baneado');
              fetchUsers(); // Refrescar la lista después de banear
          } else {
              alert('Error al banear');
          }
      } catch (error) {
          console.error('Error:', error);
      }
    };

    // Función para desbanear a un usuario
    const unbanUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5156/User/${id}/unban`, { method: 'PATCH' });
            if (response.ok) {
                alert('Usuario desbaneado');
                fetchUsers(); // Refrescar la lista después de desbanear
            } else {
                alert('Error al desbanear');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const prevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1))
      }
    
    const nextPage = () => {
    setPage(prevPage => Math.min(prevPage + 1, 10))
    }
    

    return (
        <>
            <div className="container-users">
                <h1>Lista de usuarios</h1>
                <div className="container">
                    <input  type="text" value={query} onChange={find} className="search-input" placeholder="Buscar usuario por nombre o ID.." />
                </div>
            </div>
            {
             loading ?
             <div className='spinner-container'>
                <Spinner animation="border" variant="primary" className="spinner"/> {/* es un indicador de carga mientras se procesan datos o se espera una respuesta de una API. */} 
             </div>:
             <Table striped bordered hover className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nombre del usuario</th>
                        <th>email</th>
                        <th>Fecha de incio</th>
                        <th>fecha de finalizacion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    users.map ((user) => {
                        return (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.lastName}</td>
                            <td>{user.mail}</td>
                            <td>
                                <Link to='/user/{users.id}' className='btn-ban'>Baneo</Link>
                                <Button onClick={() => banUser(user.id)} className='btn-ban'>Baneo </Button>
                                <Button onClick={() => unbanUser(user.id)} className='btn-ban'>Desbanear</Button>
                                
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
        </>
    );
};

export default Users;