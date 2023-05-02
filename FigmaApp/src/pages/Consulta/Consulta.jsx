import StickyHeadTable from "../../components/StickyHeadTable"
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate } from "react-router-dom";
import { getConsultas } from "../../helpers/consulta";

const columns = [
    { id: 'patient_name', label: 'Nombre Paciente', minWidth: 170 },
    { id: 'consulted_at', label: 'Fecha Consulta', minWidth: 170 },
    { id: 'actions', label: 'Acciones', minWidth: 100 }
];

export const Consulta = () => {

    const navigate = useNavigate();

    const [consultas, setConsultas] = useState([]);

    useEffect(() => {
        getConsultas().then((consultas) => {
            setConsultas(consultas);
        });
        
    }, []);    

    const handleView = (id) => {
        navigate(`/consultations/view/${id}`);
    }

    return (
        <div className="page">
            <div className="container mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Consultas</h1>
                    <button className="btn btn-success bg-color-secundario h-50" onClick={ () => navigate('/consultations/create')}>Nuevo</button>
                </div>
                <hr />
                <StickyHeadTable 
                    columns = { columns } 
                    rows = { consultas.map((consulta) => {
                            return {
                                id: consulta.id,
                                patient_name: consulta.expediente.paciente.first_name + ' ' + consulta.expediente.paciente.last_name,
                                consulted_at: consulta.created_at,
                            }
                        })
                    } 
                    handleView = { handleView }
                    showActions = { false }
                />
            </div>
        </div>
    )
}