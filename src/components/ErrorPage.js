import React from 'react'
import { NavLink } from 'react-router-dom'

const ErrorPage = ()=>{
    return(
        <>
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>We Are Sorry,Page Not Found</h2>
                <p className="mb-5">
                    The Page are you lookong for might have been removed 
                    hade its name changed or is temporarily unavailable. 
                </p>
                <NavLink to="/">Back To HomePage</NavLink>
            </div>
        </div>
        </>


    )
}

export default ErrorPage