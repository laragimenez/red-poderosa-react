import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { ImSearch } from 'react-icons/im';
import { Link } from 'react-router-dom';
import './Admins.css';

const Admins = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    
    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5156/User?query=${query}&page=${page}&pageSize=10&isAdmin=true`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching admin users:', error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchAdmins(); // Cargar administradores cuando el componente se monta
    }, [query,page]);

    const find = (evt) => {
        setQuery(evt.target.value);
        setPage(1);
    };

    const prevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const nextPage = () => {
        setPage(page + 1);
    };
    

    const deleteUser = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas bloquear este usuario?')) return;

        try {
            const response = await fetch(`http://localhost:5156/User/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
                return;
            }

            alert('Usuario ELIMINADO correctamente.');
            // Refrescar la lista después de borrar
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    return (
        <>
            <div className="admin-container">
                <h2>Lista de administradores</h2>
                <div className="container-search">
                    <input type="text" value={query} onChange={find} placeholder="Buscar administrador" className="search-input"/>
                    <Link to="/admin/new" className="btn btn-primary"><i className="fa fa-plus"></i>Nuevo</Link>
                </div>
            </div>
            
            {
                loading ? 
                    <div className="container-spinner">
                        <Spinner animation="border" variant="primary" className="spinner" />
                    </div> : 
                    <Table striped bordered hover className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.mail}</td>
                                    <td>
                                        <Link to={`/edit/${user.id}`} className='btn-edit'>Edit</Link>
                                        <button className='btn-delete' onClick={() => deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
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

export default Admins;