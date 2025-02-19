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
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");  // Si ya hay token, redirigimos automáticamente a Home
    }
  }, [navigate]);
  
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const falseLogin = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "janet@domain.com" && password === "p12345") {
          resolve({ user: { email }, token: "mock_token_123" });
        } else {
          reject(new Error("Credenciales incorrectas"));
        }
      }, 1000);
    });
  };
  
  const startLogin = async (e) => { //async permite usar await dentro de la función.
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
  
    setLoading(true); //Activa el estado de carga (loading = true) para mostrar "Cargando..."
    
    try {
      const data = await falseLogin(email, password); 
      // Guardamos el usuario en localStorage
      localStorage.setItem("token", data.token); // Si usas un token
      navigate("/home");// Aquí redirige al usuario a otra página, por ejemplo:
    } catch (err) {
      setError(err.message);
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
          <div className="mb-3">
            <label>Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="mb-3">
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