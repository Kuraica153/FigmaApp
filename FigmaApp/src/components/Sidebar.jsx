import { useState } from 'react';


export const Sidebar = () => {

    return (
        <div className="sidebar">
            <ul>
                <li>Consultas</li>
                <li>Expedientes</li>
                <li><a href='/users'>Usuarios</a></li>
                <li>Roles</li>
                <li>Files</li>
            </ul>
        </div>
    )
}