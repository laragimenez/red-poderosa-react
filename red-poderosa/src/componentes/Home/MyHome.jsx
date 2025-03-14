import './MyHome.css';
import React, { useState, useEffect } from 'react';

const MyHome = () => {
  const [connectedUsers, setConnectedUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  // Función para obtener los usuarios conectados
  const fetchConnectedUser = async () => {
    try {
      setLoading(true); // Empezar a cargar
      let response = await fetch('http://localhost:5297/LoginCount');  
      let data = await response.json();
      console.log("Datos de la API:", data);
      setConnectedUsers(data.numberLogin); // "numberLogin" es la propiedad que contiene el número de usuarios conectados.
    } catch (e) {
      console.error('Error fetching users:', e);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  // Llamar a la función cuando el componente se monte
  useEffect(() => {
    fetchConnectedUser();
    const interval = setInterval(fetchConnectedUser, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []); // El array vacío [] asegura que la función solo se ejecute una vez al montar el componente

  return (
    <div className="dashboard-container">
      <h2>RED PODEROSA</h2>
      <h1>Bienvenido al Panel de Administración</h1>

      <div className="stat-card">
        <h2>Usuarios Conectados</h2>

        {/* Si loading es true, mostramos "Cargando..." */}
        {loading ? (
          <p className="loading-text">Cargando...</p>
        ) : (
          <div className="connected-users-container">
            <p className="connected-users">
              <span className="big-number">{connectedUsers}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHome;

