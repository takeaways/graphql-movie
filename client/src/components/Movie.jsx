import React from 'react'
import { Link } from 'react-router-dom'

function Movie({id}) {
    return (
        <div>
           <Link to={`/${id}`} >{id}</Link>
        </div>
    )
}

export default Movie
