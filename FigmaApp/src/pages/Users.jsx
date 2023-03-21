import StickyHeadTable from "../components/StickyHeadTable"
import { deleteUser, getUsers } from "../helpers/users";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'sweetalert2/src/sweetalert2.scss'

const columns = [
    { id: 'username', label: 'Usuario', minWidth: 170 },
    { id: 'name', label: 'Nombre', minWidth: 170 },
    { id: 'lastname', label: 'Apellido', minWidth: 170 },
    { id: 'role', label: 'rol', minWidth: 170 },
    { id: 'actions', label: 'Acciones', minWidth: 100 }
];

export const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users);
            console.log(users);
        });
    }, []);    

    const handleDelete = (id) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id).then((res) => {
                    if (res) {
                        MySwal.fire(
                            'Eliminado',
                            'El usuario ha sido eliminado',
                            'success'
                        )
                        setUsers(users.filter((user) => user.id !== id));
                    }
                });
            }
        })
        console.log(id);
    }

    const handleUpdate = (id) => {
        //Redireccionar a la ruta de edición
        window.location.href = `/users/edit/${id}`;
    }

    const handleView = (id) => {
        console.log(id);
    }

    return (
        <div className="page">
            <div className="container mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Usuarios</h1>
                    <button className="btn btn-primary h-50">Nuevo</button>
                </div>
                <hr />
                <StickyHeadTable 
                    columns = { columns } 
                    rows = { users } 
                    handleView = { handleView }
                    handleUpdate = { handleUpdate}
                    handleDelete = { handleDelete } 
                />
            </div>
        </div>
    )
}