import { useState, useEffect } from "react"
import { useForm } from "../../hooks/useForm"
import { getRole } from '../../helpers/roles'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import StickyHeadTable from "../../components/StickyHeadTable"

const columns = [
    { id: 'name', label: 'Nombre', minWidth: 170 },
    { id: 'description', label: 'Descripción', minWidth: 100 },
];

export const ViewRole = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [role, setRole] = useState({});

    useEffect(() => {
        getRole(id).then((role) => {
            setRole(role);
        });
    }, []);


    return (
        <div className="page">
            <div className="container mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Role {id}</h1>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h3>Nombre</h3>
                        <h5>{role.name}</h5>
                    </div>
                    <div className="col-12 col-md-12 mt-3">
                        <h3>Permisos</h3>
                        <StickyHeadTable columns={ columns } rows={role.permissions} />
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <button className="btn btn-primary bg-color-primario" onClick={ () => navigate("/roles")}>Volver</button>
                </div>
            </div>
        </div>
    )
}