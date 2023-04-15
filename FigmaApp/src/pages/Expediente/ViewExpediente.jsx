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

export const ViewExpediente = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [expediente, setExpediente] = useState({
        id: '',
        first_name: '',
        last_name: '',
        dob: '',
        gender: '',
        weight: '',
        height: '',
        email: '',
        phone: '',
        address: '',
        alergias_medicamentos: '',
        enfermedad_paciente: '',
    });

    useEffect(() => {
        getRole(id).then((role) => {
            setRole(role);
        });
    }, []);


    return (
        <div className="page">
            <div className="container mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Expediente {id}</h1>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h3>Nombre</h3>
                        <h5>{expediente.first_name}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Apellido</h3>
                        <h5>{expediente.last_name}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Fecha de nacimiento</h3>
                        <h5>{expediente.dob}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Sexo</h3>
                        <h5>{expediente.gender}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Peso</h3>
                        <h5>{expediente.weight}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Altura</h3>
                        <h5>{expediente.height}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Correo</h3>
                        <h5>{expediente.email}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Phone</h3>
                        <h5>{expediente.phone}</h5>
                    </div>
                    <div className="col-12 mt-3">
                        <h3>Enfermedades</h3>
                        <StickyHeadTable columns={ columns } rows={role.permissions} />
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <button className="btn btn-danger" onClick={ () => navigate("/roles")}>Volver</button>
                </div>
            </div>
        </div>
    )
}