import { useState, useEffect } from "react"
import { useForm } from "../../hooks/useForm"
import { getExpediente } from '../../helpers/expedientes'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import StickyHeadTable from "../../components/StickyHeadTable"

const columns = [
    { id: 'nombre', label: 'Enfermedad', minWidth: 170 },
];

const columnsAlergias = [
    { id: 'nombre', label: 'Alergia', minWidth: 170 },
];

export const ViewExpediente = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [expediente, setExpediente] = useState({
        id: '',
        paciente: {},
    });

    useEffect(() => {
        getExpediente(id).then((expediente) => {
            setExpediente(expediente);
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
                        <h5>{expediente.paciente.first_name}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Apellido</h3>
                        <h5>{expediente.paciente.last_name}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Fecha de nacimiento</h3>
                        <h5>{expediente.paciente.dob}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Sexo</h3>
                        <h5>{expediente.paciente.gender}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Peso</h3>
                        <h5>{expediente.paciente.weight}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Altura</h3>
                        <h5>{expediente.paciente.height}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Correo</h3>
                        <h5>{expediente.paciente.email}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Phone</h3>
                        <h5>{expediente.paciente.phone}</h5>
                    </div>
                    <div className="col-12 col-md-12">
                        <h3>Dirección</h3>
                        <h5>{expediente.paciente.address}</h5>
                    </div>
                    <div className="col-12 mt-3">
                        <h3>Enfermedades</h3>
                        <StickyHeadTable columns={ columns } rows={expediente.paciente.enfermedad_paciente} />
                    </div>
                    <div className="col-12 mt-3">
                        <h3>Alergias</h3>
                        <StickyHeadTable columns={ columnsAlergias } rows={expediente.paciente.alergias_medicamentos} />
                    </div>

                </div>
                <div className="d-flex justify-content-center mt-5">
                    <button className="btn btn-danger" onClick={ () => navigate("/files")}>Volver</button>
                </div>
            </div>
        </div>
    )
}