import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Swal from 'sweetalert2'
import { useState, useEffect } from "react"
import { useForm } from "../../hooks/useForm"
import { getPermissions } from "../../helpers/permissions"
import { useNavigate } from "react-router-dom"
import { PickList } from 'primereact/picklist';
import { createRole, getRole } from '../../helpers/roles'
import { useParams } from "react-router-dom"
import { getExpediente, updateExpediente } from '../../helpers/expedientes'

export const EditExpediente = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { formState, onInputChange, setFormState, first_name, last_name, dob, gender, height, weight, phone, email, address, enfermedad_paciente, alergias_medicamentos } = useForm({
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

    const [expediente, setExpediente] = useState({
        id: '',
        paciente: {},
    });

    const [source, setSource] = useState([]);

    useEffect(() => {
        getExpediente(id).then((expediente) => {
            setFormState({
                ...formState,
                first_name: expediente.paciente.first_name,
                last_name: expediente.paciente.last_name,
                dob: expediente.paciente.dob,
                gender: expediente.paciente.gender,
                height: expediente.paciente.height,
                weight: expediente.paciente.weight,
                phone: expediente.paciente.phone,
                email: expediente.paciente.email,
                address: expediente.paciente.address,
                alergias_medicamentos: expediente.paciente.alergias_medicamentos,
                enfermedad_paciente: expediente.paciente.enfermedad_paciente
            });
            setExpediente(expediente);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateExpediente(formState, id).then((res) => {
            if (res) {
                Swal.fire({
                    icon: 'success',
                    title: 'Expediente actualizado',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/files');
            }
        });
    }

    const onSourceSelect = (e) => {
        setSource(e.source);
        setFormState({
            ...formState,
            permissions: e.target
        });
    }

    const handleAddEnfermedadPaciente = (e) => {
        e.preventDefault();
        setFormState({
            ...formState,
            enfermedad_paciente: [...enfermedad_paciente, '']
        });
    }

    const handleRemoveEnfermedadPaciente = (e, index) => {
        e.preventDefault();
        const new_enfermedad_paciente = [...enfermedad_paciente];
        new_enfermedad_paciente.splice(index, 1);
        setFormState({
            ...formState,
            enfermedad_paciente: new_enfermedad_paciente
        });
    }

    const handleAddAlergy = (e) => {
        e.preventDefault();
        setFormState({
            ...formState,
            alergias_medicamentos: [...alergias_medicamentos, '']
        });
    }

    const handleRemoveAlergy = (e, index) => {
        e.preventDefault();
        const new_alergias_medicamentos = [...alergias_medicamentos];
        new_alergias_medicamentos.splice(index, 1);
        setFormState({
            ...formState,
            alergias_medicamentos: new_alergias_medicamentos
        });
    }


    return (
        <div className="page" style={{ overflow: 'auto' }}>
            {expediente.paciente != null && Object.keys(expediente.paciente).length != 0 ? (
                <div className="container mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>Editar expediente</h1>
                    </div>
                    <hr />
                    <div className="row d-flex justify-content-center">
                        <div className="card bg-light mb-3" style={{ width: '98%' }}>
                            <div className="card-body d-flex justify-content-center">
                                Datos del paciente
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="first_name">Nombre</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="first_name"
                                    name="first_name" 
                                    value={first_name}
                                    onChange={onInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="last_name">Apellido</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="last_name"
                                    name="last_name"
                                    value={last_name}
                                    onChange={onInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="dob">Fecha de nacimiento</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dob"
                                    name="dob"
                                    value={dob}
                                    onChange={onInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="gender">Sexo</label>
                                <select 
                                    className='form-control' 
                                    id='gender'
                                    name='gender'
                                    value={gender}
                                    onChange={onInputChange}
                                >
                                    <option value=''>Seleccione</option>
                                    <option value='M'>Masculino</option>
                                    <option value='F'>Femenino</option>
                                    <option value='O'>Otro</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="weight">Peso (kg)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="weight"
                                    name="weight"
                                    value={weight}
                                    onChange={onInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="height">Altura (cm)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="height"
                                    name="height"
                                    value={height}
                                    onChange={onInputChange}
                                />
                            </div>
                        </div>
                        <div className="card bg-light mb-3 mt-3" style={{ width: '98%' }}>
                            <div className="card-body d-flex justify-content-center">
                                Datos de contacto del paciente
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="email">Correo</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={onInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="phone">Telefono</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    value={phone}
                                    onChange={onInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="address">Direccion</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={address}
                                    onChange={onInputChange}
                                />
                            </div>
                        </div>
                        <hr className='mt-3'/>
                        <div className="card bg-light mb-3" style={{ width: '98%' }}>
                            <div className="card-body d-flex justify-content-center">
                                Enfermedades del paciente
                            </div>
                        </div>
                        <div className="col-12 ">
                            <div className="form-group">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="enfermedades"></label>
                                    <button className="btn btn-success bg-color-secundario" onClick={handleAddEnfermedadPaciente}>Agregar</button>
                                </div>
                                <div className="mt-3">
                                    {
                                        enfermedad_paciente.map((sick, index) => (
                                            <div className="d-flex justify-content-between align-items-center mt-3" key={index}>
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    value={sick.nombre}
                                                    onChange={(e) => {
                                                            const newenfermedad_paciente = [...enfermedad_paciente];
                                                            newenfermedad_paciente[index] = e.target.value;
                                                            setFormState({
                                                                ...formState,
                                                                enfermedad_paciente: newenfermedad_paciente
                                                            });
                                                        }
                                                    }
                                                />
                                                <button className="btn btn-danger" onClick={(e) => handleRemoveEnfermedadPaciente(e, index)}>Eliminar</button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <hr className='mt-3'/>
                        <div className="card bg-light mb-3" style={{ width: '98%' }}>
                            <div className="card-body d-flex justify-content-center">
                                Alergias del paciente
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="form-group">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="enfermedades"></label>
                                    <button className="btn btn-success bg-color-secundario" onClick={handleAddAlergy}>Agregar</button>
                                </div>
                                <div className="mt-3">
                                    {
                                        alergias_medicamentos.map((allergy, index) => (
                                            <div className="d-flex justify-content-between align-items-center mt-3" key={index}>
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    value={allergy.nombre}
                                                    onChange={(e) => {
                                                            const newalergias_medicamentos = [...alergias_medicamentos];
                                                            newalergias_medicamentos[index] = e.target.value;
                                                            setFormState({
                                                                ...formState,
                                                                alergias_medicamentos: newalergias_medicamentos
                                                            });
                                                        }
                                                    }
                                                />
                                                <button className="btn btn-danger" onClick={(e) => handleRemoveAlergy(e, index)}>Eliminar</button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="d-flex justify-content-center mt-3 mb-3">
                        <button className="btn btn-success bg-color-secundario me-2" onClick={handleSubmit}>Guardar</button>
                        <button className="btn btn-primary bg-color-primario ms-2" onClick={ () => navigate("/files")}>Cancelar</button>
                    </div>
                </div>
            ):(null)}

        </div>
    )
}