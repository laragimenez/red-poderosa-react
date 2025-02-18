import './App.css';

import React from 'react';
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

/*const create = () => {
    console.log("crear Movie");
}

const delaite = () => {
    console.log("eliminar Movie");
}

const view = () => {
    console.log("ver Movie");
}
const update = () => {
    console.log("actualizar Movie");
}

function App() {
    return (
        <>
        <NavBar></NavBar>
        <MyButton variant={"success"}></MyButton>
        
        </>
    ); //esta funcion desestructura los objetos, para llamarlos no importa el orden pero si los nombres.
} */

    
function App() {

    const sumar = () => {
        setCount(count + 1);
    }
    const restar = () => {
        setCount(count - 1);
    }
    const [count, setCount]= useState(1);

    return (
    <>
    <BrowserRouter>

    <NavBar/>

    <Routes>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/home' element={<Home/>}></Route>
        <Route exact path='/movies' element={<MyMovies/>}></Route>
        <Route exact path='/users' element={<Users/>}></Route>
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
