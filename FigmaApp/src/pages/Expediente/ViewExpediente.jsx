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
        <div className="page" style={{ overflow: 'auto'}}>
            <div className="container mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Expediente {id}</h1>
                </div>
                <hr />
                <div className="row d-flex justify-content-center">
                    <div className="card bg-light mb-3" style={{ width: '98%' }}>
                        <div className="card-body d-flex justify-content-center">
                            Datos del paciente
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <label><strong>Nombre</strong></label>
                        <div>{expediente.paciente.first_name}</div>
                    </div>
                    <div className="col-12 col-md-6">
                        <label><strong>Apellido</strong></label>
                        <div>{expediente.paciente.last_name}</div>
                    </div>
                    <div className="col-12 col-md-6">
                        <label><strong>Fecha de nacimiento</strong></label>
                        <div>{expediente.paciente.dob}</div>
                    </div>
                    <div className="col-12 col-md-6">
                        <label><strong>Sexo</strong></label>
                        <div>{expediente.paciente.gender}</div>
                    </div>
                    <div className="col-12 col-md-6">
                        <label><strong>Peso</strong></label>
                        <div>{expediente.paciente.weight}</div>
                    </div>
                    <div className="col-12 col-md-6">
                        <label><strong>Altura</strong></label>
                        <div>{expediente.paciente.height}</div>
                    </div>
                    <div className="card bg-light mb-3 mt-3" style={{ width: '98%' }}>
                        <div className="card-body d-flex justify-content-center">
                            Datos de contacto del paciente
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <label><strong>Correo</strong></label>
                        <div>{expediente.paciente.email}</div>
                    </div>
                    <div className="col-12 col-md-6">
                        <label><strong>Phone</strong></label>
                        <div>{expediente.paciente.phone}</div>
                    </div>
                    <div className="col-12 col-md-12">
                        <label><strong>Dirección</strong></label>
                        <div>{expediente.paciente.address}</div>
                    </div>
                    <div className="card bg-light mt-3" style={{ width: '98%' }}>
                        <div className="card-body d-flex justify-content-center">
                            Enfermedades del paciente
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <StickyHeadTable columns={ columns } rows={expediente.paciente.enfermedad_paciente} />
                    </div>
                    <div className="card bg-light mt-3" style={{ width: '98%' }}>
                        <div className="card-body d-flex justify-content-center">
                            Alergias del paciente
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <StickyHeadTable columns={ columnsAlergias } rows={expediente.paciente.alergias_medicamentos} />
                    </div>

                </div>
                <div className="d-flex justify-content-center mt-5 mb-3">
                    <button className="btn btn-primary bg-color-primario" onClick={ () => navigate("/files")}>Volver</button>
                </div>
            </div>
        </div>
    )
}