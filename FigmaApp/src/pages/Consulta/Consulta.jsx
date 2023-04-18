import StickyHeadTable from "../../components/StickyHeadTable"
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate } from "react-router-dom";
import { deleteExpediente, getExpedientes } from "../../helpers/expedientes";

const columns = [
    { id: 'patient_name', label: 'Nombre Paciente', minWidth: 170 },
    { id: 'actions', label: 'Acciones', minWidth: 100 }
];

export const Consulta = () => {

    const navigate = useNavigate();

    const [expedientes, setExpedientes] = useState([]);

    useEffect(() => {
        getExpedientes().then((expedientes) => {
            setExpedientes(expedientes);
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
                deleteExpediente(id).then((res) => {
                    if (res) {
                        MySwal.fire(
                            'Eliminado',
                            'El usuario ha sido eliminado',
                            'success'
                        )
                        setExpedientes(expedientes.filter((expediente) => expediente.id !== id));
                    }
                });
            }
        })
        console.log(id);
    }


    const handleView = (id) => {
        navigate(`/consultations/view/${id}`);
    }

    return (
        <div className="page">
            <div className="container mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Consultas</h1>
                    <button className="btn btn-primary h-50" onClick={ () => navigate('/consultations/create')}>Nuevo</button>
                </div>
                <hr />
                <StickyHeadTable 
                    columns = { columns } 
                    rows = { expedientes.map((expediente) => {
                            return {
                                id: expediente.id,
                                patient_name: expediente.paciente.first_name + ' ' + expediente.paciente.last_name,
                            }
                        })
                    } 
                    handleView = { handleView }
                />
            </div>
        </div>
    )
}