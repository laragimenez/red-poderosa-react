import './App.css';

import React, { useEffect } from 'react';
import NavBar from './componentes/NavBar/NavBar'; // Asegúrate de tener la ruta correcta.
import Home from './componentes/Home/MyHome';
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Movie from './componentes/Movie/Movie';
import NotFound from './componentes/NotFound/NotFound';
import Error from './componentes/Error/Error';
import Users from './componentes/Users/Users';
import Login from './componentes/Login/Login';
import Movies from './componentes/Movies/Movies';
import EditMovie from './componentes/EditMovie/EditMovie';
import Admins from './componentes/Admins/Admins';
import NewAdmin from './componentes/Admin/NewAdmin';

// Componente ProtectedRoute para redirigir si el usuario no está autenticado
const ProtectedRoute = ({ isAuthenticated, element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />; // Redirigir al login si no está autenticado
    }
    return element;
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Estado para esperar la verificación del token
    const [message, setMessage] = useState("");  // Para el mensaje de advertencia

      
    // Verificar el token cuando se cargue el componente
    useEffect(() => {
        const token = localStorage.getItem("token"); // Verifica si hay un token en el localStorage
        setIsAuthenticated(!!token);
        setIsLoading(false);  // Si hay un token, se considera autenticado
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>; // Puedes mostrar un mensaje o animación de carga mientras se verifica el token
    }

    return (
    <>
    <BrowserRouter>

        <NavBar/>
        {message && <div style={{ color: 'red', padding: '10px', textAlign: 'center' }}>{message}</div>}

        <Routes>
            <Route exact path='/' element={<Login/>}></Route> {/*carga la página de login cuando el usuario va a "/" */}
            {/* Ruta de home protegida: solo accesible si el usuario está autenticado */}
            <Route exact path='/home' element={ <ProtectedRoute isAuthenticated={isAuthenticated} element={<Home/> }/>}></Route>
            <Route exact path='/movies' element={ <ProtectedRoute isAuthenticated={isAuthenticated} element={<Movies/>}/>}></Route>
            <Route exact path='/users' element={ <ProtectedRoute isAuthenticated={isAuthenticated}  element={<Users/>}/>}></Route>
            <Route exact path='/movie' element={<Movie/>}></Route>
            <Route exact path="/movie/:title" element={<Movie/>}></Route> {/*:id es un parámetro dinámico que se utiliza para obtener el id de la película que se desea editar.*/}
            <Route exact path='/users' element={<Users/>}></Route>
            <Route exact path='/admins' element={<Admins/>}></Route>
            <Route exact path='/admin/new' element={<NewAdmin/>}></Route>
            <Route exact path='/Page-NotFound' element={<NotFound/>}></Route>
            <Route exact path='/Error' element={<Error/>}></Route>
            <Route path='*' element={<Navigate to="/Page-NotFound"/>}></Route>


        </Routes>
    </BrowserRouter> 
    </>
    ); //con el browser envolvemos todo el codigo Y TODO LO que este fuera de route tanto arriba como afuera se puede hacer cosas la cual se va a repetir en todos los paths
}

export default App;
