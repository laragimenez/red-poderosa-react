import './Users.css';
import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import Swal from "sweetalert2";

const Users = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1); 
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);

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
            setTotalRecords(json.totalRecords);
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


    // Función para mostrar el cuadro de diálogo antes de banear
    const confirmBanUser = (nameUser, lastNameUser) => {
        Swal.fire({
            title: `Banear a ${nameUser} ${lastNameUser}`,
            input: "text",
            inputPlaceholder: "Escribe el motivo del baneo",
            showCancelButton: true,
            confirmButtonText: "Banear",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                if (!value) {
                    return "Debes ingresar un motivo para el baneo";
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                banUser(nameUser, lastNameUser, result.value);
            }
        });
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
                Swal.fire("Usuario baneado", "El usuario ha sido baneado correctamente.", "success");
                fetchUsers(); // Refrescar la lista después de banear
            } else {
                Swal.fire("Error", data.message || "Error al banear el usuario.", "error");
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire("Error", "Hubo un problema con la solicitud.", "error");
        }
    };


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
    

    return (
        <>
            <div className="container-users">
                <h1>Lista de usuarios</h1>
                <div className="user-container">
                    <input  type="text" value={query} onChange={find} className="search-input" placeholder="Buscar usuario por nombre o ID.." />
                    <Link to="/users/baners" className="btn btn-primary">Usuarios Baneados</Link>
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
                                <Button onClick={() => confirmBanUser(user.name, user.lastName)}>Banear</Button>
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
        <Button className="btn btn-secondary me-2" onClick={prevPage} disabled={page === 1}>&lt;</Button>
        <p>{page}</p>
        <Button className="btn btn-secondary ms-2" onClick={nextPage} disabled={users.length === 0}>&gt;</Button>
        </div>
        </>
    );
};

export default Users;