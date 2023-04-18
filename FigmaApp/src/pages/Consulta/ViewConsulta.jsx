import { useState, useEffect } from "react"
import { useForm } from "../../hooks/useForm"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import StickyHeadTable from "../../components/StickyHeadTable"
import { getConsulta } from "../../helpers/consulta"

const columns = [
    { id: 'nombre', label: 'Enfermedad', minWidth: 170 },
];

const columnsAlergias = [
    { id: 'nombre', label: 'Alergia', minWidth: 170 },
];

export const ViewConsulta = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [consulta, setConsulta] = useState({
        motivo_visita: '',
        complicaciones: '',
        tratamiento: '',
        medicacion: [],
        procedimientos: [],
        expediente: {
            id: '',
            paciente_id: '',
            paciente: {
                first_name: '',
                last_name: '',
                dob: '',
                gender: '',
                weight: '',
                height: '',
                phone: '',
                email: '',
                address: '',
                alergias_medicamentos: [],
                enfermedad_paciente: [],
            }
        }
    });

    useEffect(() => {
        getConsulta(id).then((consulta) => {
            setConsulta(consulta);
        });
    }, []);

    const { motivo_visita, complicaciones, tratamiento, medicacion, procedimientos, expediente } = consulta;
    const { first_name, last_name, dob, gender, weight, height, phone, email, address, alergias_medicamentos, enfermedad_paciente } = expediente.paciente;

    return (
        <div className="page" style={{overflow : 'auto'}}>
            <div className="container mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Consulta {id}</h1>
                </div>
                <hr />
                <div className="row d-flex justify-content-center">
                    <div className="card bg-light mb-3" style={{ width: '97%' }}>
                        <div className="card-body d-flex justify-content-center">
                            Datos del paciente
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group d-flex flex-column">
                            <label htmlFor="first_name"><strong>Nombre</strong></label>
                            {first_name ? first_name : 'No especificado'}
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group d-flex flex-column">
                            <label htmlFor="last_name"><strong>Apellido</strong></label>
                            {last_name ? last_name : 'No especificado'}
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group d-flex flex-column">
                            <label htmlFor="dob"><strong>Fecha de nacimiento</strong></label>
                            {dob ? dob : 'No especificado'}
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group d-flex flex-column">
                            <label htmlFor="gender"><strong>Sexo</strong></label>
                            {gender === 'M' ? 'Masculino' : gender === 'F' ? 'Femenino' : 'No especificado'}
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group d-flex flex-column">
                            <label htmlFor="weight"><strong>Peso (kg)</strong></label>
                            {weight ? weight : 'No especificado'}
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group d-flex flex-column">
                            <label htmlFor="height"><strong>Altura (cm)</strong></label>
                            {height ? height : 'No especificado'}
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group d-flex flex-column">
                            <label htmlFor="email"><strong>Correo</strong></label>
                            {email ? email : 'No especificado'}
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group d-flex flex-column">
                            <label htmlFor="phone"><strong>Telefono</strong></label>
                            {phone ? phone : 'No especificado'}
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group d-flex flex-column">
                            <label htmlFor="sickness"><strong>Enfermedades</strong></label>
                            <ul>
                                {
                                    enfermedad_paciente.map((sickness, index) => (
                                        <li key={index}>{sickness.nombre}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group d-flex flex-column">
                            <label htmlFor="allergies"><strong>Alergias</strong></label>
                            <ul>
                                {
                                    alergias_medicamentos.map((allergy, index) => (
                                        <li key={index}>{allergy.nombre}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <hr className='mt-3' />
                    <div className="card bg-light mb-3" style={{ width: '97%' }}>
                        <div className="card-body d-flex justify-content-center">
                            Seguimiento de consultas anteriores
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <label htmlFor="last_consultation">Fecha ultima consulta</label>
                            <input
                                type="date"
                                className="form-control w-25"
                                id="last_consultation"
                                name="last_consultation"
                                readOnly
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="motivo_visita">Motivo de consulta</label>
                            <textarea
                                className="form-control"
                                id="motivo_visita"
                                name="motivo_visita"
                                defaultValue={ motivo_visita }
                                readOnly
                                rows="3"
                                disabled
                            ></textarea>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="complicaciones">¿Há presentado complicaciones?</label>
                            <textarea
                                className="form-control"
                                id="complicaciones"
                                name="complicaciones"
                                defaultValue={ complicaciones }
                                readOnly
                                rows="3"
                                disabled
                            ></textarea>
                        </div>
                    </div>
                    <hr className='mt-3' />
                    <div className="card bg-light mb-3" style={{ width: '97%' }}>
                        <div className="card-body d-flex justify-content-center">
                            Datos de la consulta
                        </div>
                    </div>
                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label htmlFor="tratamiento">¿Esta siendo tratado por un medico actualmente?¿Para qué?</label>
                            <textarea
                                className="form-control"
                                id="tratamiento"
                                name="tratamiento"
                                defaultValue={ tratamiento }
                                readOnly
                                rows="3"
                                disabled
                            ></textarea>
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <div className="form-group">
                            <div className="d-flex justify-content-between align-items-center">
                                <label htmlFor="">¿Esta recibiendo medicación?</label>
                            </div>
                            <div className="mt-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6>Nombre</h6>
                                    <h6>Dosis</h6>
                                    <h6>Frecuencia</h6>
                                    <h6>Duración</h6>
                                </div>
                                {
                                    medicacion.map((medicamento, index) => (
                                        <div key={index} className="d-flex justify-content-between align-items-center mt-3">
                                            <h6>{ medicamento.medicamento.nombre }</h6>
                                            <h6>{ medicamento.dosis }</h6>
                                            <h6>{ medicamento.frecuencia }</h6>
                                            <h6>{ medicamento.duracion }</h6>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <hr className='mt-3' />
                    <div className="col-12 mt-3">
                        <div className="form-group">
                            <div className="d-flex justify-content-between align-items-center">
                                <label htmlFor="procedimientos">Procedimientos</label>
                            </div>
                            <div className="mt-3">
                                {
                                    procedimientos.map((procedimiento, index) => (
                                        console.log(procedimiento),
                                        <div key={index} className="d-flex justify-content-between align-items-center">
                                            <h6>{ procedimiento.procedimiento }</h6>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <hr className='mt-3' />

                </div>
                <div className="d-flex justify-content-center mt-3 mb-3">
                    <button className="btn btn-danger ms-2" onClick={() => navigate("/consultations")}>Volver</button>
                </div>
            </div>
        </div>
    )
}