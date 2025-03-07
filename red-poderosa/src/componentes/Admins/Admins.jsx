import './Admins.css';
import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Admins = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    
    const fetchAdmins = async () => {
        try{
            setLoading (true)
            const paramsQuery = query.trim() ? query : "all";
            let response = await fetch(`http://localhost:5297/Admin/AllUsersAdmin?Query=${paramsQuery}&page=${page}&pageSize=10`) 

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            let json = await response.json();
        
            setAdmins(json.users);
            setTotalRecords(json.totalRecords);
            
            } catch(e){
            console.error("Error fetching movies:", e);
            }  finally{
            setLoading(false)
            }
    }
    
    useEffect(() => {
        fetchAdmins(); // Cargar administradores cuando el componente se monta
    }, [query,page]);

    const find = (evt) => { 
        const {value} = evt.target;
        setQuery(value);
      }
    

    const prevPage = () => {
        if (page > 1) setPage(page - 1);
    };

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
    // Función para eliminar un admin
    const deleteAdmin = async (userId, name) => {
        Swal.fire({
            title: `¿Deseas borrar este administrador?`,
            text: `Administrador: ${name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    console.log(`Deleting admin with ID: ${userId}`);
    
                    const response = await fetch('http://localhost:5297/User', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: userId }) // Enviar el ID correcto
                    });
    
                    if (response.ok) {
                        // Si la eliminación es exitosa, actualizamos el estado de los administradores
                        setAdmins(admins.filter(admin => admin.id !== userId));
                        Swal.fire("Eliminado", `El administrador ${name} ha sido eliminado.`, "success");
                    } else {
                        const data = await response.json();
                        Swal.fire("Error", data.message || "No se pudo eliminar el administrador.", "error");
                    }
                } catch (e) {
                    console.error('Error deleting admin:', e);
                    Swal.fire("Error", "Ocurrió un problema al eliminar.", "error");
                }
            }
        });
    };

    return (
        <>
            <div className="admins">
                <div className="admins-container">
                    <h2>Lista de administradores</h2>
                    <div className="container-admins">
                        <input type="text" value={query} onChange={find} placeholder="Buscar administrador" className="search-input"/>
                        <Link to="/admin" className="btn btn-primary"><i className="fa fa-plus"></i>Nuevo</Link>
                    </div>
                </div>
                
                {
                loading ? 
                    <div className="spinner-admins">
                        <Spinner animation="border" variant="primary" className="spinner" />
                    </div> : 
                    <Table striped bordered hover className="tableAdmins">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Estado</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            admins.map((admin) => {
                                return (
                                <tr key={admin.id}>
                                    <td>{admin.id}</td>
                                    <td>{admin.name}</td>
                                    <td>{admin.lastName}</td>
                                    <td>{admin.userStatus}</td>
                                    <td>
                                        <Link to={`/admin/${admin.id}`} className='btn btn-primary'><i className="fa fa-pencil"></i></Link>
                                        <Button variant="danger" onClick={() => deleteAdmin(admin.id, admin.name)}><i className="fa fa-times"></i></Button>
                                    </td>
                                </tr>
                            
                            )})}
                        </tbody>
                    </Table>
                }
                <div className="pagination-container">
                    {/* Botones de Paginación */}
                    <Button className="btn btn-secondary me-2" onClick={prevPage} disabled={page === 1}>&lt;</Button><span>{page}</span>
                    <Button className="btn btn-secondary ms-2" onClick={nextPage} disabled={admins.length === 0}>&gt;</Button>
                </div>
            </div>
        </>
    );
};

export default Admins;