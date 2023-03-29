import StickyHeadTable from "../../components/StickyHeadTable"
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate } from "react-router-dom";
import { deleteRole, getRoles } from "../../helpers/roles";

const columns = [
    { id: 'name', label: 'Rol', minWidth: 170 },
    { id: 'actions', label: 'Acciones', minWidth: 100 }
];

export const Role = () => {

    const navigate = useNavigate();

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getRoles().then((roles) => {
            setRoles(roles);
            console.log(roles);
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
                deleteRole(id).then((res) => {
                    if (res) {
                        MySwal.fire(
                            'Eliminado',
                            'El usuario ha sido eliminado',
                            'success'
                        )
                        setRoles(roles.filter((role) => role.id !== id));
                    }
                });
            }
        })
        console.log(id);
    }

    const handleUpdate = (id) => {
        navigate(`/roles/edit/${id}`);
    }

    const handleView = (id) => {
        navigate(`/roles/view/${id}`);
    }

    return (
        <div className="page">
            <div className="container mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Roles</h1>
                    <button className="btn btn-primary h-50" onClick={ () => navigate('/roles/create')}>Nuevo</button>
                </div>
                <hr />
                <StickyHeadTable 
                    columns = { columns } 
                    rows = { roles } 
                    handleView = { handleView }
                    handleUpdate = { handleUpdate}
                    handleDelete = { handleDelete } 
                />
            </div>
        </div>
    )
}