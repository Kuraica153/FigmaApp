import StickyHeadTable from "../../components/StickyHeadTable"
import { deleteUser, getUsers } from "../../helpers/users";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate } from "react-router-dom";

const columns = [
    { id: 'username', label: 'Usuario', minWidth: 170 },
    { id: 'first_name', label: 'Nombre', minWidth: 170 },
    { id: 'last_name', label: 'Apellido', minWidth: 170 },
    { id: 'role', label: 'rol', minWidth: 170 },
    { id: 'actions', label: 'Acciones', minWidth: 100 }
];

export const Users = () => {

    const navigate = useNavigate();

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
        navigate(`/users/edit/${id}`);
    }

    const handleView = (id) => {
        navigate(`/users/view/${id}`);
    }

    return (
        <div className="page">
            <div className="container mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Usuarios</h1>
                    <button className="btn btn-primary h-50" onClick={ () => navigate('/users/create')}>Nuevo</button>
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