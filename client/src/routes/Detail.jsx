import React from 'react'
import {useParams} from "react-router-dom"
function Detail() {
    const {id} = useParams()
    console.log(id)
    return (
        <div>
            Detail
Detail
        </div>
    )
}

export default Detail
