import './App.css';

import React from 'react';
import NavBar from './componentes/NavBar/NavBar'; // Asegúrate de tener la ruta correcta.
import MyButton from './componentes/MyButton/MyButton';
import { useState } from 'react';
import MyInput from './componentes/MyInput/MyInput';

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
        <NavBar></NavBar>
        <MyButton text={"Sumar"} callback={sumar} variant={"success"}></MyButton>
        <MyButton text={"Restar"} callback={restar} variant={"primary"}></MyButton>
        <MyInput count={count}></MyInput>
        
        </>
    ); //esta funcion desestructura los objetos, para llamarlos no importa el orden pero si los nombres.
}

export default App;

/*
<MyButton text={"Crear Movie"} callback={create} variant={"success"}></MyButton>
<MyButton text={"Eliminar Movie"} callback={delaite} variant={"danger"}></MyButton>
<MyButton text={"Ver Movie"} callback={view} variant={"warning"}></MyButton>
<MyButton text={"Actualizar Movie"} callback={update} variant={"primary"}></MyButton> */
