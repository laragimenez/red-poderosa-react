import './Admin.css';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { ImSpinner3 } from 'react-icons/im';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';

const Admin = () => {
    const { id } = useParams(); // Obtiene el id desde la URL
    const [loading, setLoading] = useState(false);
    const [loadingForm, setLoadingForm] = useState(false);
    const [admin, setAdmin] = useState({
        "name": "",
        "lastName": "",
        "birthdate": "",
        "email": "",
        "description": "",
        "id": 0
    });

    // Fetch para obtener los datos del Admin si el id existe
    const fetchAdmin = async () => {
        setLoadingForm(true);
        try {
            const response = await fetch(`http://localhost:5297/Admin/GetAdmin?UserId=${id}`);
            const json = await response.json();
            console.log("Datos recibidos:", json); // 👀 Verifica los datos en consola

    
            setAdmin({
                "name": json.nameUser,
                "lastName": json.lastnameUser,
                "birthdate": json.birthdateUser || "", 
                "email": json.emailUser,
                "description": json.descriptionUser,
                "id": json.id
            });
        } catch(e) {
            console.error("Error obteniendo el admin:", e);
        } finally {
            setLoadingForm(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchAdmin(); // Si tenemos un id en la URL, obtenemos el admin a editar
        }
    }, [id]);

    // Handle submit para el formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        try {
            let response;
            let url, method;

            if (!id) {
                // Si no hay id, creamos un nuevo administrador
                url = 'http://localhost:5297/Admin';
                method = 'POST';
            } else {
                // Si hay un id, actualizamos el administrador
                url = `http://localhost:5297/Admin`;
                method = 'PUT';
            }
            
            response = await fetch(url, {
                method,
                body: JSON.stringify({
                    idUser: admin.id, // ID del usuario
                    name: admin.name,
                    lastName: admin.lastName,
                    birthdate: admin.birthdate ? new Date(admin.birthdate).toISOString() : null,
                    email: admin.email,
                    description: admin.description
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

            if (method === 'POST' || method === 'PUT') {
                Swal.fire({
                    title: '¡Éxito!',
                    text: json.message || 'Operación exitosa',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            
                if (method === 'POST') {
                    setAdmin({
                        name: "",
                        lastName: "",
                        birthdate: "",
                        email: "",
                        description: "",
                        id: 0
                    });
                }
            }
            
        } catch (error) {
            Swal.fire({
                title: '¡Error!',
                text: error.message || 'Hubo un problema en la conexión.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAdmin({
            ...admin,
            [name]: value
        });
    };

    return (
        <> 
            <div className="admin-container">
            {
                loadingForm ? <div className='spinner'><ImSpinner3 /></div> :
                    <>
                        <h2>{id ? "Editar Administrador" : "Nuevo Administrador"}</h2>
                        <form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="txtName">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre"
                                    name="name"
                                    value={admin.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="txtLastName">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el apellido"
                                    name="lastName"
                                    value={admin.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="txtBirthdate">
                                <Form.Label>Fecha de Nacimiento</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="birthdate"
                                    value={admin.birthdate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="txtEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Ingrese el email"
                                    name="email"
                                    value={admin.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="txtDescription">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese la descripción"
                                    name="description"
                                    value={admin.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <button type="submit"> {loading ? <ImSpinner3 className="spinner" /> : "Guardar"}
                            </button>
                        </form>
                    </>
                }
            </div>
        </>
     );
}

export default Admin;

