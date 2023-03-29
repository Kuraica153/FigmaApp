import Swal from 'sweetalert2'
import { useState, useEffect } from "react"
import { useForm } from "../../hooks/useForm"
import { getPermissions } from "../../helpers/permissions"
import { useNavigate } from "react-router-dom"
import { PickList } from 'primereact/picklist';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import { createRole } from '../../helpers/roles'

export const CreateRole = () => {

    const navigate = useNavigate();

    const { formState, onInputChange, setFormState, name, permissions } = useForm({
        name: '',
        permissions: []
    });

    const [source, setSource] = useState([]);

    useEffect(() => {
        getPermissions().then((permissions) => {
            setSource(permissions);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        createRole(formState).then((res) => {
            if (res) {
                Swal.fire(
                    'Rol creado',
                    'El rol ha sido creado',
                    'success'
                )
                navigate('/roles');
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


    return (
        <div className="page">
            <div className="container mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Crear rol</h1>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name"
                                name="name" 
                                value={name}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-12 mt-3">
                        <div className="form-group">
                            <label htmlFor="permissions">Permisos</label>
                            <PickList
                                source={source}
                                target={permissions}
                                itemTemplate={(item) => {
                                        return (
                                            <div className="p-picklist-item">
                                                <div className="p-picklist-item-content">{item.name}</div>
                                                <div className="p-picklist-item-content">{item.description}</div>
                                            </div>
                                        );
                                    }
                                }
                                sourceHeader="Permisos disponibles"
                                targetHeader="Permisos asignados"
                                showSourceControls={false}
                                showTargetControls={false}
                                onChange={onSourceSelect}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary me-2" onClick={handleSubmit}>Guardar</button>
                    <button className="btn btn-danger ms-2" onClick={ () => navigate("/roles")}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}