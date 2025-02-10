import 'bootstrap/dist/css/bootstrap.min.css'; 
import './MyButton.css'; 

import React from 'react'
import Button from 'react-bootstrap/Button';

const MyButton = ({text, callback, variant}) => { //dentro de la llave reciben parametros, la funcion de cada parametro de callback esta definido en App.js
  return (
  <>
  <Button onClick= {callback} variant={variant}>{text}</Button> 
    
  </>
)}

/*const MyButton = ({variant}) => { //dentro de la llave reciben parametros, la funcion de cada parametro de callback esta definido en App.js
    const [textButton, setTextButton] = useState("Hola");
    return (
    <>
    <Button onClick={()=> {setTextButton("Chau")}} variant={variant}>{textButton}</Button> 
      
    </>
  )
}

/*const MyButton = ({text, callback, variant}) => { //dentro de la llave reciben parametros, la funcion de cada parametro de callback esta definido en App.js
    return (
      <>
      <Button onClick={callback} variant={variant}>{text}</Button> 
        
      </>
    )
  } */

export default MyButton;
