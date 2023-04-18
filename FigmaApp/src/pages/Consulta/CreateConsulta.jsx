import Swal from 'sweetalert2'
import { useState, useEffect } from "react"
import { useForm } from "../../hooks/useForm"
import { createExpediente } from "../../helpers/expedientes"
import { createConsulta } from "../../helpers/consulta"
import { useNavigate } from "react-router-dom"
import { Button, Modal } from 'react-bootstrap'
import { getExpedienteByName } from "../../helpers/expedientes"
import StickyHeadTable from "../../components/StickyHeadTable"

const columns = [
    { id: 'patient_name', label: 'Nombre Paciente', minWidth: 170 },
];

export const CreateConsulta = () => {

    const navigate = useNavigate();

    const [search, setSearch] = useState('');

    const [show, setShow] = useState(false);

    const [expedientes, setExpedientes] = useState([]);

    const [paciente, setPaciente] = useState({
        first_name: '',
        last_name: '',
        dob: '',
        gender: '',
        height: '',
        weight: '',
        phone: '',
        email: '',
        address: '',
        enfermedad_paciente: [],
        alergias_medicamentos: []
    });

    const { formState, onInputChange, setFormState, motivo_visita, complicaciones, tratamiento, medicacion, procedimientos, expediente_id } = useForm({
        motivo_visita: '',
        complicaciones: '',
        tratamiento: '',
        medicacion: [],
        procedimientos: [],
        expediente_id: ''
    });

    useEffect(() => {
        if(expedientes.length === 0)
        return;
        setPaciente({
            ...formState,
            ...expedientes[0].paciente,
        });
        setFormState({
            ...formState,
            expediente_id: expedientes[0].id
        });
        console.log
    }, [expedientes]);
    
    const { first_name, last_name, dob, gender, height, weight, phone, email, address, enfermedad_paciente, alergias_medicamentos } = paciente;

    const handleSearch = (e) => {
        e.preventDefault();
        const search_name = search.split(' ')[0];
        const search_last_name = search.split(' ')[1];
        getExpedienteByName(search_name, search_last_name).then((expedientes) => {
            let new_expedientes = [];
            new_expedientes.push(expedientes);
            setExpedientes(new_expedientes);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(formState));
        createConsulta(formState).then((res) => {
            if (res) {
                Swal.fire({
                    icon: 'success',
                    title: 'Expediente creado',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/consultations');
            }
        });
    }

    const handleAddMedicacion = (e) => {
        e.preventDefault();
        setFormState({
            ...formState,
            medicacion: [...medicacion, { medicamento: '', dosis: '', frecuencia: '', duracion: '' }]
        });
    }

    const handleRemoveMedicacion = (e, index) => {
        e.preventDefault();
        const new_medicacion = medicacion.filter((medicamento, i) => i !== index);
        setFormState({
            ...formState,
            medicacion: new_medicacion
        });
    }

    const handleAddProcedimiento = (e) => {
        e.preventDefault();
        setFormState({
            ...formState,
            procedimientos: [...procedimientos, { procedimiento: '' }]
        });
    }

    const handleRemoveProcedimiento = (e, index) => {
        e.preventDefault();
        const new_procedimientos = procedimientos.filter((procedimiento, i) => i !== index);
        setFormState({
            ...formState,
            procedimientos: new_procedimientos
        });
    }
    

    return (
        <div className="page" style={{overflow : 'auto'}}>
            <div className="container mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Crear consulta</h1>
                    <button className="btn btn-primary" onClick={ () => setShow(true) }>Buscar Paciente</button>
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
                                value={ motivo_visita }
                                onChange={ onInputChange }
                                rows="3"
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
                                value={ complicaciones }
                                onChange={ onInputChange }
                                rows="3"
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
                                value={ tratamiento }
                                onChange={ onInputChange }
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <div className="form-group">
                            <div className="d-flex justify-content-between align-items-center">
                                <label htmlFor="enfermedades">¿Esta siendo tratado por un medico actualmente?</label>
                                <button className="btn btn-primary" onClick={handleAddMedicacion}>Agregar</button>
                            </div>
                            <div className="mt-3">
                                {
                                    medicacion.map((medicamento, index) => (
                                        <div className="d-flex justify-content-between align-items-center mt-3" key={index}>
                                            <input
                                                type="text"
                                                className="form-control me-2"
                                                value={medicamento.medicamento}
                                                placeholder='Medicamento'
                                                onChange={
                                                    (e) => {
                                                        const { value } = e.target;
                                                        setFormState({
                                                            ...formState,
                                                            medicacion: formState.medicacion.map((medicamento, i) => {
                                                                if (i === index) {
                                                                    medicamento.medicamento = value;
                                                                }
                                                                return medicamento;
                                                            }
                                                            )
                                                        })
                                                    }
                                                }
                                            />
                                            <input
                                                type="text"
                                                className="form-control me-2"
                                                value={medicamento.dosis}
                                                placeholder='Dosis'
                                                onChange={
                                                    (e) => {
                                                        const { value } = e.target;
                                                        setFormState({
                                                            ...formState,
                                                            medicacion: formState.medicacion.map((medicamento, i) => {
                                                                if (i === index) {
                                                                    medicamento.dosis = value;
                                                                }
                                                                return medicamento;
                                                            }
                                                            )
                                                        })
                                                    }
                                                }
                                            />
                                            <input
                                                type="text"
                                                className="form-control me-2"
                                                value={medicamento.frecuencia}
                                                placeholder='Frecuencia'
                                                onChange={
                                                    (e) => {
                                                        const { value } = e.target;
                                                        setFormState({
                                                            ...formState,
                                                            medicacion: formState.medicacion.map((medicamento, i) => {
                                                                if (i === index) {
                                                                    medicamento.frecuencia = value;
                                                                }
                                                                return medicamento;
                                                            }
                                                            )
                                                        })
                                                    }
                                                }
                                            />
                                            <input
                                                type="text"
                                                className="form-control me-2"
                                                value={medicamento.duracion}
                                                placeholder='Duracion'
                                                onChange={
                                                    (e) => {
                                                        const { value } = e.target;
                                                        setFormState({
                                                            ...formState,
                                                            medicacion: formState.medicacion.map((medicamento, i) => {
                                                                if (i === index) {
                                                                    medicamento.duracion = value;
                                                                }
                                                                return medicamento;
                                                            }
                                                            )
                                                        })
                                                    }
                                                }
                                            />

                                            <button className="btn btn-danger" onClick={(e) => handleRemoveMedicacion(e, index)}>Eliminar</button>
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
                                <button className="btn btn-primary" onClick={handleAddProcedimiento}>Agregar</button>
                            </div>
                            <div className="mt-3">
                                {
                                    procedimientos.map((procedimiento, index) => (
                                        <div className="d-flex justify-content-between align-items-center mt-3" key={index}>
                                            <input
                                                type="text"
                                                className="form-control me-2"
                                                value={procedimiento.procedimiento}
                                                placeholder='Procedimiento'
                                                onChange={(e) => {
                                                    const { value } = e.target;
                                                    setFormState({
                                                        ...formState,
                                                        procedimientos: formState.procedimientos.map((procedimiento, i) => {
                                                            if (i === index) {
                                                                procedimiento.procedimiento = value;
                                                            }
                                                            return procedimiento;
                                                        }
                                                        )
                                                    })
                                                }}
                                            />
                                            <button className="btn btn-danger" onClick={(e) => handleRemoveProcedimiento(e, index)}>Eliminar</button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <hr className='mt-3' />

                </div>
                <div className="d-flex justify-content-center mt-3 mb-3">
                    <button className="btn btn-primary me-2" onClick={handleSubmit}>Guardar</button>
                    <button className="btn btn-danger ms-2" onClick={() => navigate("/files")}>Cancelar</button>
                </div>
            </div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-control d-flex'>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder='Ingrese el nombre del paciente'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>Buscar</button>
                    </div>
                    <div className='mt-3'>
                        <StickyHeadTable 
                            columns = { columns } 
                            rows = { expedientes.map((expediente) => {
                                    return {
                                        id: expediente.id,
                                        patient_name: expediente.paciente.first_name + ' ' + expediente.paciente.last_name,
                                    }
                                })
                            } 
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary">Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}