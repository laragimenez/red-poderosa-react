import './App.css';

import React, { useEffect } from 'react';
import NavBar from './componentes/NavBar/NavBar'; // Asegúrate de tener la ruta correcta.
import Home from './componentes/Home/MyHome';
import MyButton from './componentes/MyButton/MyButton';
import { useState } from 'react';
import MyInput from './componentes/MyInput/MyInput';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MyMovies from './componentes/Movies/MyMovies';
import Movie from './componentes/Movie/Movie';
import NotFound from './componentes/NotFound/NotFound';
import Error from './componentes/Error/Error';
import Users from './componentes/Users/Users';
import Login from './componentes/Login/Login';
/*
function App() {
    return (
        <>
        <NavBar></NavBar>
        <MyButton variant={"success"}></MyButton>
        
        </>
    ); //esta funcion desestructura los objetos, para llamarlos no importa el orden pero si los nombres.
} */

    
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

    const ProtectedRoute = ({ element, ...rest }) => {
        if (isAuthenticated) {
            return element;
        } else {
            setMessage("Por favor, inicia sesión para acceder a esta página.");
            return <Navigate to="/" />;
        }
    };


    return (
    <>
    <BrowserRouter>

    <NavBar/>
    {message && <div style={{ color: 'red', padding: '10px', textAlign: 'center' }}>{message}</div>}

    <Routes>
        <Route exact path='/' element={<Login/>}></Route> {/*carga la página de login cuando el usuario va a "/" */}
        {/* Ruta de home protegida: solo accesible si el usuario está autenticado */}
        <Route exact path='/home' element={ <ProtectedRoute element={<Home/> }/>}></Route>
        <Route exact path='/movies' element={ <ProtectedRoute element={<MyMovies/>}/>}></Route>
        <Route exact path='/users' element={ <ProtectedRoute element={<Users/>}/>}></Route>
        <Route exact path='/movies/:movieName' element={<Movie/>}></Route>
        <Route exact path='/Page-NotFound' element={<NotFound/>}></Route>
        <Route exact path='/Error' element={<Error/>}></Route>
        <Route path='*' element={<Navigate to="/Page-NotFound"/>}></Route>


    </Routes>
    </BrowserRouter> 
    </>
    ); //con el browser envolvemos todo el codigo Y TODO LO que este fuera de route tanto arriba como afuera se puede hacer cosas la cual se va a repetir en todos los paths
}

export default App;

/*
<MyButton text={"Crear Movie"} callback={create} variant={"success"}></MyButton>
<MyButton text={"Eliminar Movie"} callback={delaite} variant={"danger"}></MyButton>
<MyButton text={"Ver Movie"} callback={view} variant={"warning"}></MyButton>
<MyButton text={"Actualizar Movie"} callback={update} variant={"primary"}></MyButton> */
