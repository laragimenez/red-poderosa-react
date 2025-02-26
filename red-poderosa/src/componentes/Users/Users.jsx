import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Users.css';

const Users = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1); 
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    // Función para obtener los usuarios
    const fetchUsers = async () => {
      try {
            setLoading(true);
            const paramsQuery = query.trim() ? query : "all";
            let response = await fetch(`http://localhost:5297/User/AllUsers?Query=${paramsQuery}&page=${page}&pageSize=10`);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            let json = await response.json();
            setUsers(json.users);
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
    const banUser = async (nameUser, lastNameUser, reason) => {
        try {
            const response = await fetch("http://localhost:5297/UserBan/BanUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nameUser, lastNameUser, reason })
            });
    
            const data = await response.json();
    
            if (response.ok && data.success) {
                alert("Usuario baneado correctamente.");
                fetchUsers(); // Refrescar la lista después de banear
            } else {
                alert(data.message || "Error al banear el usuario.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Función para desbanear a un usuario
    const unbanUser = async (name, lastName) => {
        try {
            const response = await fetch('http://localhost:5297/UserBan/PutBanner', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nameUser: name,
                    lastNameUser: lastName
                })
            });
    
            const result = await response.json();
            
            if (result.success) {
                alert('Usuario desbaneado');
                fetchUsers(); // Refrescar la lista después de desbanear
            } else {
                alert(result.message || 'Error al desbanear');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la solicitud de desbaneo.');
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
                    <Link to="/movie" className="btn btn-primary">Usuarios Baneados</Link>
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
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Estado</th>
                        <th>Avatar</th>
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
                            <td>{user.userStatus === 1 ? "Activo" : "Inactivo"}</td>
                            <td>
                                <img 
                                    src={user.avatar.startsWith("http") ? user.avatar : "https://img.freepik.com/vector-premium/icono-perfil-simple-color-blanco-icono_1076610-50204.jpg"}
                                    alt="Avatar"
                                    width="50"
                                    height="50"
                                    style={{ borderRadius: "50%" }}
                                />
                            </td>
                            <td>
                                <Button onClick={() => banUser(user.name, user.lastName, "Incumplimiento de normas")} className="btn-ban">Baneo</Button>
                                <Button onClick={() => unbanUser(user.name, user.lastName)} className='btn-ban'>Desbanear</Button>
                                
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