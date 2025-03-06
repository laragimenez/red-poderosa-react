import './Login.css';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Almacena mensajes de error (si los hay).
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Verificamos si ya hay un token y redirigimos al home
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/home");  // Si ya está autenticado, redirigimos automáticamente a Home
    }
  }, []);
  
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const startLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validaciones
    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo válido.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres."); 
      return;
    }

    setLoading(true); // Activa el estado de carga (loading = true) para mostrar "Cargando..."
    
    try {
      const response = await fetch(`http://localhost:5297/Login/Login`, { // Reemplaza con la URL de tu API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailUser: email, 
          passwordUser: password,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Si la respuesta es exitosa, almacenamos el estado de autenticación
        localStorage.setItem("isAuthenticated", "true"); // Almacena el estado de autenticación
        localStorage.setItem("email", email); // Puedes almacenar el email u otro dato si lo necesitas
        navigate("/home"); // Redirige al usuario al Home después del login exitoso
      } else {
        setError(data.message || "Error desconocido"); // Si hay error, mostramos el mensaje
      }
    } catch (err) {
      setError("Hubo un problema al realizar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={startLogin} className="w-50 mx-auto">
          <div className="input">
            <label>Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="input">
            <label>Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required //obliga a que el usuario complete ambos campos antes de enviar el formulario.
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};


export default Login;


/*try {
  const response = await fetch("https://tu-api.com/login", {  // envía los datos al backend (https://tu-api.com/login) usando POST
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });*/