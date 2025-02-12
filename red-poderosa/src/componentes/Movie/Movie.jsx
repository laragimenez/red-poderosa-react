import React from 'react'
import { useParams } from 'react-router-dom'

const Movie = () => {
    const{movieName} = useParams(); //useaPrams tambien es un Hoock
    return (
        <div>
        'welcome-to-the-jangle' {movieName}
        </div>
    )
}

export default Movie
