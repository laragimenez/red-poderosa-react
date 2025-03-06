import { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";

const BanUsers = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1); 
  const [usersBan, setUsersBan] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchBansUsers= async () =>{
      try{
        setLoading (true)
        let response = await fetch(`http://localhost:5297/UserBan/GetAllUserBanned?query=${query}&page=${page}&pageSize=10`)  //Cambiar ejemplo `http://localhost:5088/Song?query=${query}&page=${page}&pageSize=3`
        console.log(response)
        let json = await response.json();
  
        console.log(json);
  
        setUsersBan(json.usersBan); //La API devuelve usersBan
      
      } catch(e){
        console.error("Error fetching movies:", e);
      }  finally{
        setLoading(false)
      }
    }
  
    useEffect(() => {
      fetchBansUsers();
    }, [page, query]);
  
  const find = (evt) => { 
    const {value} = evt.target;
    setQuery(value);
  }

  const unbanUser = async (name, lastName) => {
    try {
        const response = await fetch('http://localhost:5297/UserBan/PutBanner', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              NameUser: name,  
              LastNameUser: lastName 
            })
        });

        const result = await response.json();
        
        if (result.success) {
            alert('Usuario desbaneado');
            fetchBansUsers(); // Refrescar la lista después de desbanear
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
                <h1>Lista de usuarios baneados</h1>
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
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Estado</th>
                        <th>Avatar</th>
                        <th>Fecha de inicio</th>
                        <th>Fecha de finalizacion</th>
                        <th>Motivo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    usersBan.map ((user) => {
                        return (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.nameUser}</td>
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
                            <td>{user.startTime}</td>
                            <td>{user.endTime}</td>
                            <td>{user.reason}</td>
                             <td>
                                <Button onClick={() => unbanUser(user.nameUser, user.lastName)} className='btn-ban'>Desbanear</Button>
                                
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

export default BanUsers;