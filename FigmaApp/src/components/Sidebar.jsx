import { useState } from 'react';
import { useNavigate } from "react-router-dom";


export const Sidebar = () => {

    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <ul className='d-flex flex-column align-content-lg-between'>
                <li onClick={ () => navigate('/consultations') }>Consultas</li>
                <li onClick={ () => navigate('/files') }>Expedientes</li>
                <li onClick={ () => navigate('/users') }>Usuarios</li>
                <li onClick={ () => navigate('/roles') }>Roles</li>
            </ul>
        </div>
    )
}